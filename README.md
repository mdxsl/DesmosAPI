# Lab3-Using-Web-APIs

## Issues
Before:
I need to go over using HTML
The code for creating a graph, saving it, and then retrieving it from a menu
API calls
### During: Issue / Cause / Solution
1. Loading API Key / os was lacking, didn't load dotenv / added load_dotenv() and import os
2. String within my save graph function wasn't formatting the string with $ properly / Was using comma instead of a back comma / Added a back commas to the text
3. Graph wasn't loading when I input ID / my response variable had comma instead of back comma / Added back commas to the text
4. Cannot read properties of null (reading 'value') / loadId element couldn't be interpreted because of the value object / Took away value and added more code to verify the graph result
5. Updated files weren't translating to page / Cached files were still being used that had my old code / Added a parameter '?v=2' to my html script
### Resolution History
