-----------------------------------------
  Qlik Automation Parameter Passthrough
-----------------------------------------

With the change being implemented by Qlik on the 2nd June 2026 it will no longer be possible to pass the token
required to execute a Qlik Automation as a parameter in the URL of the call.

This tool acts as a proxy, receiving the parameters in the URL and passing the token on as a header in the
subsequent call to the Qlik Cloud Analytics webhook.

The code is hosted at https://steve-qi.github.io/qlik-auto/ and can be used there, or downloaded and
hosted within your own network, for extra security.

The proxy receives the following parameters:

site:    The first part of the Sense tenant, e.g. your-site.uk
auto:    The GUID of your Automation - get this from the URL when you look at your automation
token:   The Execution Token found in the start block of your automation
ex:      Any extra parameters with URL encoding (i.e. = is %3d)

For example:
https://steve-qi.github.io/qlik-auto/?site=your-site.uk&auto=xxx&token=xxx&ex=app&3dxxx

When called the app will send the parameters on to the nominated automation and then show the return values
with colour coding for whether the call was successful.

Further details around why this app exists can be found on this blog post:
https://www.quickintelligence.co.uk/qlik-automation-webhooks/

Steve Dark

Quick Intelligence
