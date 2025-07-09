import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, AlertCircle, CheckCircle, Minus, Plus, MessageSquare, ThumbsUp, ThumbsDown, Trash2, Store, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import type { Visit, LocationPermissionStatus, NearbyRetailer } from '@/types/visit';

export default function MyVisits() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [locationPermission, setLocationPermission] = useState<LocationPermissionStatus>('prompt');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStep, setRecordingStep] = useState<'idle' | 'recording' | 'scanning'>('idle');
  const [editingComments, setEditingComments] = useState<string | null>(null);
  const [deletingVisitId, setDeletingVisitId] = useState<string | null>(null);
  const [selectingRetailerForVisit, setSelectingRetailerForVisit] = useState<{id: string, lat: number, lng: number} | null>(null);
  const [nearbyRetailers, setNearbyRetailers] = useState<any[]>([]);
  const [experienceStates, setExperienceStates] = useState<Record<string, boolean | null>>({});
  const [updatingDemoCount, setUpdatingDemoCount] = useState<string | null>(null);
  const [checkingPermission, setCheckingPermission] = useState(false);

  // Check location permission on mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Fetch user's visits with sync status
  const { data: visits, isLoading } = useQuery({
    queryKey: ['visits', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visits')
        .select(`
          *,
          visit_retailers (
            *,
            retailers (
              id,
              name,
              address,
              city,
              state
            )
          )
        `)
        .eq('auth_id', user?.id)
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  // Update demo count mutation
  const updateDemoCount = useMutation({
    mutationFn: async ({ visitId, newCount }: { visitId: string; newCount: number }) => {
      setUpdatingDemoCount(visitId);
      
      try {
        const { data, error } = await supabase
          .from('visits')
          .update({ customer_demo_count: newCount })
          .eq('id', visitId)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          throw new Error('No data returned - check RLS policies');
        }
        
        return data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      // Force immediate refetch
      queryClient.invalidateQueries({ queryKey: ['visits', user?.id] });
      queryClient.refetchQueries({ queryKey: ['visits', user?.id] });
      toast.success('Demo count updated');
    },
    onError: (error: any) => {
      toast.error(`Failed to update: ${error.message || 'Unknown error'}`);
    },
    onSettled: () => {
      setUpdatingDemoCount(null);
    },
  });

  // Update visit details mutation
  const updateVisitDetails = useMutation({
    mutationFn: async ({ 
      visitId, 
      comments, 
      isPositive 
    }: { 
      visitId: string; 
      comments: string; 
      isPositive: boolean | null;
    }) => {
      const { error } = await supabase
        .from('visits')
        .update({ 
          comments, 
          is_positive_experience: isPositive 
        })
        .eq('id', visitId);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['visits', user?.id] });
      toast.success('Visit details updated');
      setEditingComments(null);
      // Clean up experience state for this visit
      setExperienceStates(prev => {
        const { [variables.visitId]: _, ...rest } = prev;
        return rest;
      });
    },
    onError: (error) => {
      console.error('Failed to update visit details:', error);
      toast.error('Failed to update visit details');
    },
  });

  // Link retailer to visit mutation
  const linkRetailerToVisit = useMutation({
    mutationFn: async ({ visitId, retailerId, distance }: { visitId: string; retailerId: string; distance: number }) => {
      const { error } = await supabase
        .from('visit_retailers')
        .insert({
          visit_id: visitId,
          retailer_id: retailerId,
          distance_feet: distance,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits', user?.id] });
      toast.success('Retailer linked to visit');
      setSelectingRetailerForVisit(null);
      setNearbyRetailers([]);
    },
    onError: (error) => {
      console.error('Failed to link retailer:', error);
      toast.error('Failed to link retailer');
    },
  });

  // Delete visit mutation
  const deleteVisit = useMutation({
    mutationFn: async (visitId: string) => {
      console.log('=== DELETE VISIT DEBUG ===');
      console.log('Visit ID:', visitId);
      console.log('Current User ID:', user?.id);
      
      // First, let's verify the visit exists and check ownership
      const { data: visitCheck, error: checkError } = await supabase
        .from('visits')
        .select('*')
        .eq('id', visitId)
        .single();
        
      if (checkError) {
        console.error('Error checking visit:', checkError);
        throw new Error('Visit not found');
      }
      
      console.log('Visit found:', visitCheck);
      console.log('Visit owner (auth_id):', visitCheck.auth_id);
      console.log('Current user:', user?.id);
      console.log('IDs match?', visitCheck.auth_id === user?.id);
      
      if (visitCheck.auth_id !== user?.id) {
        throw new Error('You can only delete your own visits');
      }
      
      // Now attempt the delete
      const { data, error } = await supabase
        .from('visits')
        .delete()
        .eq('id', visitId)
        .select();
      
      console.log('Delete result:', { data, error });
      
      if (error) {
        console.error('Delete error details:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.error('No rows were deleted despite matching auth_id');
        
        // Let's check RLS policies
        const { data: rpcResult, error: rpcError } = await supabase
          .rpc('auth.uid');
        console.log('RPC auth.uid() result:', rpcResult, 'error:', rpcError);
        
        throw new Error('Failed to delete visit - no rows affected. Check RLS policies.');
      }
      
      console.log('Visit deleted successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits', user?.id] });
      toast.success('Visit deleted successfully');
      setDeletingVisitId(null);
    },
    onError: (error) => {
      console.error('Failed to delete visit:', error);
      toast.error('Failed to delete visit');
      setDeletingVisitId(null);
    },
  });

  // Record visit mutation
  const recordVisit = useMutation({
    mutationFn: async ({ lat, lng }: { lat: number | null; lng: number | null }) => {
      // Show progress toast
      const toastId = toast.loading('Recording your visit...');
      
      // If no location, prompt user to add retailer info in comments
      const comments = !lat || !lng ? 'Please add retailer location details here' : null;
      
      // First, create the visit
      const { data: visit, error: visitError } = await supabase
        .from('visits')
        .insert({
          auth_id: user?.id,
          lat,
          lng,
          recorded_at: new Date().toISOString(),
          customer_demo_count: 0,
          comments,
          is_positive_experience: null,
        })
        .select()
        .single();

      if (visitError) {
        toast.dismiss(toastId);
        throw visitError;
      }
      
      // Only try to find retailers if we have coordinates
      let nearbyRetailers = [];
      if (lat && lng) {
        // Update toast and state
        toast.loading('Finding nearby retailers...', { id: toastId });
        setRecordingStep('scanning');

        // Find nearby retailers using the database function
        const { data: retailers, error: nearbyError } = await supabase
          .rpc('find_nearby_retailers', {
            p_lat: lat,
            p_lng: lng,
            p_max_distance_feet: 1000,
          });
          
        if (!nearbyError && retailers) {
          nearbyRetailers = retailers;
        }

      }

      // Link visit to nearby retailers
      if (nearbyRetailers.length > 0) {
        const visitRetailers = nearbyRetailers.map((retailer: NearbyRetailer) => ({
          visit_id: visit.id,
          retailer_id: retailer.retailer_id,
          distance_feet: retailer.distance_feet,
        }));

        const { error: linkError } = await supabase
          .from('visit_retailers')
          .insert(visitRetailers);

        if (linkError) {
          // Don't fail the whole visit if linking fails
          console.error('Failed to link retailers:', linkError);
        }
      }
      
      toast.dismiss(toastId);
      return { visit, nearbyRetailers };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['visits', user?.id] });
      const retailerCount = data.nearbyRetailers?.length || 0;
      
      // If we didn't have location data, prompt to edit comments
      if (!data.visit.lat || !data.visit.lng) {
        toast.success('Visit recorded! Please add the retailer location in the comments.');
        // Automatically open the comments editor for this visit
        setTimeout(() => {
          setEditingComments(data.visit.id);
        }, 500);
      } else if (retailerCount > 0) {
        toast.success(`Visit recorded! Found ${retailerCount} nearby retailer${retailerCount > 1 ? 's' : ''}.`);
      } else {
        toast.success('Visit recorded!');
      }
      setRecordingStep('idle');
    },
    onError: (error) => {
      console.error('Failed to record visit:', error);
      toast.error('Failed to record visit. Please try again.');
      setRecordingStep('idle');
    },
  });

  const fetchNearbyRetailers = async (lat: number, lng: number) => {
    try {
      const { data, error } = await supabase
        .rpc('find_nearby_retailers', {
          p_lat: lat,
          p_lng: lng,
          p_max_distance_feet: 52800, // 10 miles in feet
        })
        .limit(10);

      if (error) throw error;
      
      // Fetch full retailer details
      const retailerIds = data.map((r: any) => r.retailer_id);
      const { data: retailers, error: retailersError } = await supabase
        .from('retailers')
        .select('*')
        .in('id', retailerIds);
        
      if (retailersError) throw retailersError;
      
      // Combine with distance info
      const retailersWithDistance = data.map((nearbyRetailer: any) => {
        const retailer = retailers?.find(r => r.id === nearbyRetailer.retailer_id);
        return {
          ...retailer,
          distance_feet: nearbyRetailer.distance_feet,
        };
      });
      
      setNearbyRetailers(retailersWithDistance);
    } catch (error) {
      console.error('Failed to fetch nearby retailers:', error);
      toast.error('Failed to find nearby retailers');
    }
  };

  const checkLocationPermission = async () => {
    setCheckingPermission(true);
    
    // iOS Safari doesn't support navigator.permissions properly
    // So we'll use a different approach
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (!navigator.permissions || isIOS) {
      // For iOS or browsers without permissions API, we'll try to get location directly
      // to determine the permission state
      try {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Timeout'));
          }, 5000);
          
          navigator.geolocation.getCurrentPosition(
            () => {
              clearTimeout(timeout);
              setLocationPermission('granted');
              resolve();
            },
            (error) => {
              clearTimeout(timeout);
              if (error.code === error.PERMISSION_DENIED) {
                setLocationPermission('denied');
              } else {
                setLocationPermission('prompt');
              }
              resolve();
            },
            {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 0
            }
          );
        });
      } catch {
        setLocationPermission('prompt');
      }
      setCheckingPermission(false);
      return;
    }

    // For browsers that support permissions API
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(result.state as LocationPermissionStatus);
      
      result.addEventListener('change', () => {
        setLocationPermission(result.state as LocationPermissionStatus);
      });
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLocationPermission('prompt');
    }
    
    setCheckingPermission(false);
  };

  const requestLocationPermission = async () => {
    setShowLocationDialog(false);
    
    // Show loading state
    const toastId = toast.loading('Requesting location permission...');
    
    navigator.geolocation.getCurrentPosition(
      async () => {
        setLocationPermission('granted');
        toast.success('Location permission granted!', { id: toastId });
        
        // Immediately try to record the visit after permission is granted
        setIsRecording(true);
        setRecordingStep('recording');
        
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await recordVisit.mutateAsync({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setIsRecording(false);
            setRecordingStep('idle');
          },
          async (error) => {
            console.error('Failed to get location after permission:', error);
            toast.warning('Location unavailable. Recording visit without coordinates.');
            
            await recordVisit.mutateAsync({
              lat: null,
              lng: null,
            });
            
            setIsRecording(false);
            setRecordingStep('idle');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      },
      (error) => {
        toast.dismiss(toastId);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission('denied');
          toast.error('Location permission denied. You can still record visits without location.');
        } else {
          // On iOS, sometimes the error isn't PERMISSION_DENIED even when denied
          // So we'll check again
          checkLocationPermission();
          toast.error('Failed to get location. Please try again.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleRecordVisit = async () => {
    // For iOS, we need to handle this differently
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // If permission is denied, still allow recording with null coordinates
    if (locationPermission === 'denied') {
      setIsRecording(true);
      setRecordingStep('recording');
      
      // Record visit without location
      await recordVisit.mutateAsync({
        lat: null,
        lng: null,
      });
      
      setIsRecording(false);
      setRecordingStep('idle');
      return;
    }
    
    // For iOS or when permission is not clearly granted, try to get location directly
    if (isIOS || locationPermission === 'prompt') {
      // Don't show dialog for iOS, just try to get location
      setIsRecording(true);
      setRecordingStep('recording');
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocationPermission('granted');
          await recordVisit.mutateAsync({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsRecording(false);
          setRecordingStep('idle');
        },
        async (error) => {
          console.error('Failed to get location:', error);
          
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermission('denied');
            toast.error('Location permission denied. Recording visit without coordinates.');
          } else {
            toast.warning('Location unavailable. Recording visit without coordinates.');
          }
          
          await recordVisit.mutateAsync({
            lat: null,
            lng: null,
          });
          
          setIsRecording(false);
          setRecordingStep('idle');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
      return;
    }
    
    // For non-iOS browsers with clear permission state
    if (locationPermission !== 'granted') {
      setShowLocationDialog(true);
      return;
    }

    setIsRecording(true);
    setRecordingStep('recording');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await recordVisit.mutateAsync({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsRecording(false);
        setRecordingStep('idle');
      },
      async (error) => {
        console.error('Failed to get location:', error);
        
        // Instead of showing error, save visit with null coordinates
        toast.warning('Location unavailable. Recording visit without coordinates.');
        
        await recordVisit.mutateAsync({
          lat: null,
          lng: null,
        });
        
        setIsRecording(false);
        setRecordingStep('idle');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Visits</h1>

        {/* Location Permission Alert */}
        {locationPermission === 'denied' && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>Location permission is denied. You can still record visits, but you'll need to manually add the retailer location in the comments.</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setLocationPermission('prompt');
                  checkLocationPermission();
                }}
                disabled={checkingPermission}
              >
                {checkingPermission ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Check Again'
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Record Visit Button */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Record a Visit</CardTitle>
            <CardDescription>
              Click the button below to record your current location when visiting a retailer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleRecordVisit}
                disabled={isRecording}
                className="w-full sm:w-auto"
              >
                {recordingStep === 'scanning' ? (
                  <>
                    <Store className="mr-2 h-4 w-4 animate-spin" />
                    Scanning Retailers...
                  </>
                ) : isRecording ? (
                  <>
                    <MapPin className="mr-2 h-4 w-4 animate-pulse" />
                    Recording Visit...
                  </>
                ) : locationPermission === 'denied' ? (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Record Visit (No Location)
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4" />
                    Record a Visit
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visits List */}
        <Card>
          <CardHeader>
            <CardTitle>Visit History</CardTitle>
            <CardDescription>
              Your recorded visits to local retailers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading visits...
              </div>
            ) : visits && visits.length > 0 ? (
              <div className="space-y-4">
                {visits.map((visit) => (
                  <div
                    key={visit.id}
                    className={`border rounded-lg p-4 space-y-4 transition-colors ${
                      visit.is_positive_experience === true 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' 
                        : visit.is_positive_experience === false
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium">
                          {format(new Date(visit.recorded_at), 'PPpp')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Location: {visit.lat && visit.lng ? `${visit.lat.toFixed(6)}, ${visit.lng.toFixed(6)}` : 'No location recorded'}
                        </p>
                        {visit.visit_retailers && visit.visit_retailers.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              Nearby Retailers:
                            </p>
                            <ul className="ml-4 mt-1 space-y-1">
                              {visit.visit_retailers.map((vr: any) => (
                                <li key={vr.id} className="text-sm text-muted-foreground">
                                  • {vr.retailers?.name} ({Math.round(vr.distance_feet)} ft away)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (visit.visit_retailers && visit.visit_retailers.length > 0 && visit.visit_retailers[0].retailers) {
                              navigate(`/retailers/${visit.visit_retailers[0].retailers.id}`);
                            } else {
                              setSelectingRetailerForVisit({ id: visit.id, lat: visit.lat, lng: visit.lng });
                              fetchNearbyRetailers(visit.lat, visit.lng);
                            }
                          }}
                          className={visit.visit_retailers && visit.visit_retailers.length > 0 ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-foreground"}
                          title={visit.visit_retailers && visit.visit_retailers.length > 0 ? "View retailer details" : "Link a retailer"}
                        >
                          <Store className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeletingVisitId(visit.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Delete visit"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Customer Demo Counter */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-sm font-medium">Customer Demos</span>
                      <div className="flex items-center gap-3">
                        <Button
                          size="default"
                          variant="outline"
                          onClick={() => {
                            const newCount = Math.max(0, (visit.customer_demo_count || 0) - 1);
                            updateDemoCount.mutate({ visitId: visit.id, newCount });
                          }}
                          disabled={updatingDemoCount === visit.id}
                          className="h-12 w-12 p-0"
                        >
                          {updatingDemoCount === visit.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Minus className="h-5 w-5" />
                          )}
                        </Button>
                        <span className="w-16 text-center font-semibold text-lg">
                          {visit.customer_demo_count || 0}
                        </span>
                        <Button
                          size="default"
                          variant="outline"
                          onClick={() => {
                            const newCount = (visit.customer_demo_count || 0) + 1;
                            updateDemoCount.mutate({ visitId: visit.id, newCount });
                          }}
                          disabled={updatingDemoCount === visit.id}
                          className="h-12 w-12 p-0"
                        >
                          {updatingDemoCount === visit.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Comments
                        </span>
                        {visit.is_positive_experience !== null && (
                          <span className="text-sm">
                            {visit.is_positive_experience ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                Positive
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center gap-1">
                                <ThumbsDown className="h-4 w-4" />
                                Negative
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      
                      {editingComments === visit.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Add comments about this visit..."
                            defaultValue={visit.comments || ''}
                            className="min-h-[80px]"
                            id={`comments-${visit.id}`}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <label htmlFor={`experience-${visit.id}`} className="text-sm font-medium">
                                Experience:
                              </label>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium transition-colors ${
                                  experienceStates[visit.id] === false ? 'text-red-600' : 'text-muted-foreground'
                                }`}>
                                  Negative
                                </span>
                                <Switch
                                  id={`experience-${visit.id}`}
                                  defaultChecked={visit.is_positive_experience === true}
                                  onCheckedChange={(checked) => {
                                    setExperienceStates(prev => ({ ...prev, [visit.id]: checked }));
                                  }}
                                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                                />
                                <span className={`text-sm font-medium transition-colors ${
                                  experienceStates[visit.id] === true ? 'text-green-600' : 'text-muted-foreground'
                                }`}>
                                  Positive
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingComments(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  const textarea = document.getElementById(`comments-${visit.id}`) as HTMLTextAreaElement;
                                  const isPositive = experienceStates[visit.id] ?? visit.is_positive_experience;
                                  
                                  updateVisitDetails.mutate({
                                    visitId: visit.id,
                                    comments: textarea.value,
                                    isPositive,
                                  });
                                }}
                                disabled={updateVisitDetails.isPending}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {visit.comments ? (
                            <p className="text-sm text-muted-foreground">{visit.comments}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">No comments</p>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingComments(visit.id);
                              setExperienceStates(prev => ({ ...prev, [visit.id]: visit.is_positive_experience }));
                            }}
                            className="mt-1"
                          >
                            {visit.comments ? 'Edit' : 'Add'} Comments
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No visits recorded yet. Start by recording your first visit!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Permission Dialog */}
        <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enable Location Access</DialogTitle>
              <DialogDescription>
                To record your visits, we need access to your location. This helps us automatically
                detect nearby retailers and track your visits.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={async () => {
                  setShowLocationDialog(false);
                  setIsRecording(true);
                  setRecordingStep('recording');
                  
                  // Record visit without location
                  await recordVisit.mutateAsync({
                    lat: null,
                    lng: null,
                  });
                  
                  setIsRecording(false);
                  setRecordingStep('idle');
                }}
                className="w-full sm:w-auto"
              >
                Continue without location
              </Button>
              <Button onClick={requestLocationPermission} className="w-full sm:w-auto">
                Enable Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingVisitId} onOpenChange={(open) => !open && setDeletingVisitId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Visit</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this visit? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deletingVisitId) {
                    deleteVisit.mutate(deletingVisitId);
                  }
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Retailer Selection Dialog */}
        <Dialog open={!!selectingRetailerForVisit} onOpenChange={(open) => {
          if (!open) {
            setSelectingRetailerForVisit(null);
            setNearbyRetailers([]);
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select a Retailer</DialogTitle>
              <DialogDescription>
                Choose a retailer to link to this visit from the closest locations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {nearbyRetailers.length > 0 ? (
                nearbyRetailers.map((retailer) => (
                  <div
                    key={retailer.id}
                    className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => {
                      if (selectingRetailerForVisit) {
                        linkRetailerToVisit.mutate({
                          visitId: selectingRetailerForVisit.id,
                          retailerId: retailer.id,
                          distance: Math.round(retailer.distance_feet),
                        });
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{retailer.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {retailer.address}, {retailer.city}, {retailer.state}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {(retailer.distance_feet / 5280).toFixed(1)} mi
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Loading nearby retailers...
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}