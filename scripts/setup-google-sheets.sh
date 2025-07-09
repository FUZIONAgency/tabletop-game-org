#!/bin/bash

echo "Google Sheets Integration Setup Script"
echo "======================================"
echo ""
echo "This script will help you set up the Google Sheets integration for MyVisits."
echo ""
echo "Prerequisites:"
echo "1. You need a Google Cloud account"
echo "2. You need access to the Google Sheet"
echo "3. You need the Supabase CLI installed"
echo ""
echo "Steps this script will guide you through:"
echo "1. Create a service account in Google Cloud"
echo "2. Download the service account key"
echo "3. Extract the required values"
echo "4. Set Supabase secrets"
echo "5. Deploy the Edge Functions"
echo ""
read -p "Press Enter to continue..."

echo ""
echo "Step 1: Create a Service Account"
echo "================================"
echo "1. Go to: https://console.cloud.google.com/"
echo "2. Create or select a project"
echo "3. Enable Google Sheets API"
echo "4. Go to APIs & Services > Credentials"
echo "5. Create Credentials > Service Account"
echo "6. Download the JSON key file"
echo ""
read -p "Have you downloaded the service account key JSON file? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please complete the steps above and run this script again."
    exit 1
fi

echo ""
echo "Step 2: Extract Values from JSON Key"
echo "===================================="
read -p "Enter the path to your service account JSON key file: " json_file

if [ ! -f "$json_file" ]; then
    echo "File not found: $json_file"
    exit 1
fi

# Extract values using jq or python
if command -v jq &> /dev/null; then
    CLIENT_EMAIL=$(jq -r '.client_email' "$json_file")
    PRIVATE_KEY=$(jq -r '.private_key' "$json_file")
    PROJECT_ID=$(jq -r '.project_id' "$json_file")
elif command -v python3 &> /dev/null; then
    CLIENT_EMAIL=$(python3 -c "import json; print(json.load(open('$json_file'))['client_email'])")
    PRIVATE_KEY=$(python3 -c "import json; print(json.load(open('$json_file'))['private_key'])")
    PROJECT_ID=$(python3 -c "import json; print(json.load(open('$json_file'))['project_id'])")
else
    echo "Please install jq or python3 to continue"
    exit 1
fi

echo ""
echo "Extracted values:"
echo "Client Email: $CLIENT_EMAIL"
echo "Project ID: $PROJECT_ID"
echo "Private Key: [HIDDEN]"
echo ""

echo "Step 3: Share Google Sheet with Service Account"
echo "=============================================="
echo "1. Open: https://docs.google.com/spreadsheets/d/1kdHKn_Id29N1NvRFlvNtPaoBmBbQZL2RnmC6ZXuI05c"
echo "2. Click 'Share' button"
echo "3. Add email: $CLIENT_EMAIL"
echo "4. Give 'Editor' permission"
echo "5. Click 'Send'"
echo ""
read -p "Have you shared the Google Sheet with the service account? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please share the sheet and run this script again."
    exit 1
fi

echo ""
echo "Step 4: Set Supabase Secrets"
echo "============================"
echo "Running supabase secrets set commands..."
echo ""

# Set the secrets
supabase secrets set GOOGLE_SERVICE_ACCOUNT_EMAIL="$CLIENT_EMAIL"
supabase secrets set GOOGLE_PRIVATE_KEY="$PRIVATE_KEY"
supabase secrets set GOOGLE_PROJECT_ID="$PROJECT_ID"

echo ""
echo "Step 5: Deploy Edge Functions"
echo "============================"
read -p "Deploy Edge Functions now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Deploying sync-visit-to-sheets..."
    supabase functions deploy sync-visit-to-sheets
    
    echo ""
    echo "Deploying retry-failed-syncs..."
    supabase functions deploy retry-failed-syncs
fi

echo ""
echo "Setup Complete!"
echo "=============="
echo ""
echo "Next steps:"
echo "1. Test by recording a visit in the MyVisits page"
echo "2. Check the Google Sheet for the new entry"
echo "3. If there are issues, check the Edge Function logs"
echo ""
echo "To view logs:"
echo "supabase functions logs sync-visit-to-sheets"