import os
import requests
import json

# Env vars passed by the pipeline variables
CLIENT_ID = os.environ['PORT_CLIENT_ID']
CLIENT_SECRET = os.environ['PORT_CLIENT_SECRET']
API_URL = 'https://api.getport.io/v1'

credentials = {
    'clientId': CLIENT_ID,
    'clientSecret': CLIENT_SECRET
}
token_response = requests.post(f"{API_URL}/auth/access_token", json=credentials)
# use this access token + header for all http requests to Port
access_token = token_response.json()['accessToken']
headers = {
	'Authorization': f'Bearer {access_token}'
}

entity_json = {
  "identifier": "new-cijob-run",
  "properties": {
    "triggeredBy": os.environ['QUEUED_BY'],
    "commitHash": os.environ['GIT_SHA'],
    "actionJob": os.environ['JOB_NAME'],
    "jobLink": os.environ['JOB_URL']
  },
  "relations": {
      "image": ["example-image"]
  }
}

create_response = requests.post(f'{API_URL}/blueprints/{blueprint_id}/entities?upsert=true&create_missing_related_entities=true', json=entity_json, headers=headers)
