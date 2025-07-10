import { toast } from 'sonner';

export type LocationPermissionStatus = 'granted' | 'denied' | 'prompt' | 'unavailable';

interface LocationResult {
  status: LocationPermissionStatus;
  coords?: GeolocationCoordinates;
  error?: GeolocationPositionError;
}

interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
}

/**
 * Detects the user's device and browser
 */
export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isAndroid = /Android/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edg/.test(ua);
  const isFirefox = /Firefox/.test(ua);

  return {
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
  };
}

/**
 * Checks if geolocation is available in the browser
 */
export function isGeolocationAvailable(): boolean {
  return 'geolocation' in navigator;
}

/**
 * Checks current location permission status
 * Handles iOS Safari which doesn't support permissions API
 */
export async function checkLocationPermission(): Promise<LocationPermissionStatus> {
  if (!isGeolocationAvailable()) {
    return 'unavailable';
  }

  const deviceInfo = getDeviceInfo();

  // iOS Safari and some mobile browsers don't support permissions API
  if (!navigator.permissions || deviceInfo.isIOS) {
    // For iOS, we can't check permission status without prompting
    // Return 'prompt' to indicate we should ask when needed
    return 'prompt';
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state as LocationPermissionStatus;
  } catch (error) {
    console.error('Error checking permission:', error);
    // Fallback for browsers that don't support permissions API
    return 'prompt';
  }
}

/**
 * Requests location with proper error handling
 */
export async function requestLocation(
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  }
): Promise<LocationResult> {
  if (!isGeolocationAvailable()) {
    return {
      status: 'unavailable',
      error: new GeolocationPositionError(),
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          status: 'granted',
          coords: position.coords,
        });
      },
      (error) => {
        let status: LocationPermissionStatus = 'denied';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            status = 'denied';
            break;
          case error.POSITION_UNAVAILABLE:
          case error.TIMEOUT:
            // These aren't permission issues, but location failures
            status = 'granted'; // Permission is granted but location failed
            break;
        }

        resolve({
          status,
          error,
        });
      },
      options
    );
  });
}

/**
 * Shows platform-specific instructions for enabling location permissions
 */
export function showLocationSettingsInstructions(): void {
  const deviceInfo = getDeviceInfo();
  let instructions = '';

  if (deviceInfo.isIOS) {
    if (deviceInfo.isSafari) {
      instructions = `To enable location for Safari on iOS:
1. Open Settings app
2. Scroll down and tap Safari
3. Tap Location
4. Select "While Using App" or "Ask"
5. Return to this page and refresh`;
    } else if (deviceInfo.isChrome) {
      instructions = `To enable location for Chrome on iOS:
1. Open Settings app
2. Scroll down and tap Chrome
3. Tap Location
4. Select "While Using App" or "Ask"
5. Return to this page and refresh`;
    } else {
      instructions = `To enable location on iOS:
1. Open Settings app
2. Find and tap on your browser app
3. Tap Location
4. Select "While Using App" or "Ask"
5. Return to this page and refresh`;
    }
  } else if (deviceInfo.isAndroid) {
    if (deviceInfo.isChrome) {
      instructions = `To enable location for Chrome on Android:
1. Tap the lock icon in the address bar
2. Tap "Permissions"
3. Tap "Location" and select "Allow"
4. Refresh the page`;
    } else {
      instructions = `To enable location on Android:
1. Open your browser settings
2. Find Site Settings or Permissions
3. Tap Location
4. Allow location for this site
5. Refresh the page`;
    }
  } else {
    // Desktop browsers
    if (deviceInfo.isChrome) {
      instructions = `To enable location in Chrome:
1. Click the lock/info icon in the address bar
2. Click "Site settings"
3. Find "Location" and change to "Allow"
4. Refresh the page`;
    } else if (deviceInfo.isFirefox) {
      instructions = `To enable location in Firefox:
1. Click the lock icon in the address bar
2. Click the blocked location icon
3. Select "Allow" for location
4. Refresh the page`;
    } else if (deviceInfo.isSafari) {
      instructions = `To enable location in Safari:
1. Click Safari in the menu bar
2. Select Preferences > Websites > Location
3. Find this website and change to "Allow"
4. Refresh the page`;
    } else {
      instructions = `To enable location:
1. Check your browser's site settings
2. Find location permissions
3. Allow location for this site
4. Refresh the page`;
    }
  }

  // Show instructions in a persistent toast
  toast.info(instructions, {
    duration: 10000,
    action: {
      label: 'Dismiss',
      onClick: () => {},
    },
  });
}

/**
 * Handles location permission request with proper UX
 */
export async function handleLocationPermissionRequest(): Promise<LocationResult> {
  const permissionStatus = await checkLocationPermission();

  if (permissionStatus === 'unavailable') {
    toast.error('Location services are not available in your browser');
    return { status: 'unavailable' };
  }

  if (permissionStatus === 'denied') {
    showLocationSettingsInstructions();
    return { status: 'denied' };
  }

  // For 'prompt' or 'granted', try to get location
  const toastId = toast.loading('Getting your location...');
  const result = await requestLocation();
  
  toast.dismiss(toastId);

  if (result.status === 'denied') {
    showLocationSettingsInstructions();
  } else if (result.error && result.status === 'granted') {
    // Permission granted but location failed
    toast.error('Unable to get your location. Please try again.');
  } else if (result.coords) {
    toast.success('Location obtained successfully!');
  }

  return result;
}

/**
 * Custom hook for managing location permissions
 * (To be used in React components)
 */
export function useLocationPermission() {
  const [status, setStatus] = useState<LocationPermissionStatus>('prompt');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    checkLocationPermission().then(setStatus);
  }, []);

  const requestPermission = useCallback(async () => {
    setIsChecking(true);
    const result = await handleLocationPermissionRequest();
    setStatus(result.status);
    setIsChecking(false);
    return result;
  }, []);

  const recheckPermission = useCallback(async () => {
    setIsChecking(true);
    const newStatus = await checkLocationPermission();
    setStatus(newStatus);
    setIsChecking(false);
    return newStatus;
  }, []);

  return {
    status,
    isChecking,
    requestPermission,
    recheckPermission,
    showInstructions: showLocationSettingsInstructions,
  };
}

// Add missing imports at the top of the file
import { useState, useEffect, useCallback } from 'react';