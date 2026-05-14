document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('automationForm');
    const output = document.getElementById('spOutput');

    // 1. Extract parameters from the page URL
    const urlParams = new URLSearchParams(window.location.search);
    
    const params = {
        site: urlParams.get('site'),
        auto: urlParams.get('auto'),
        token: urlParams.get('token'),
        ex: urlParams.get('ex')
    };

    // 2. Populate form fields if parameters exist
    if (params.site) document.getElementById('site').value = params.site;
    if (params.auto) document.getElementById('auto').value = params.auto;
    if (params.token) document.getElementById('token').value = params.token;
    if (params.ex) document.getElementById('ex').value = params.ex;

    // 3. Auto-trigger if all three parameters are present
    if (params.site && params.auto && params.token) {
        executeAutomation(params.site, params.auto, params.token, params.ex);
    }

    // 4. Handle manual button click
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh
        
        const siteVal = document.getElementById('site').value;
        const autoVal = document.getElementById('auto').value;
        const tokenVal = document.getElementById('token').value;
        const exVal = document.getElementById('ex').value;

        executeAutomation(siteVal, autoVal, tokenVal, exVal);
    });

    /**
     * core function to perform the API call
     */
    function executeAutomation(site, auto, token, ex) {
        output.innerHTML = "Executing...";
        output.className = "output-box"; // Reset classes

        const fullUrl = `https://${site}.qlikcloud.com/api/v1/automations/${auto}/actions/execute?${ex}`;

		console.log('Calling URL: ' + fullUrl);

        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    output.innerHTML = this.responseText || "Success: Automation triggered.";
                    output.classList.add('success');
                } else {
                    output.innerHTML = `Error ${this.status}: ${this.statusText || 'Connection Failed'}`;
                    output.classList.add('error');
                }
            }
        };

        xhttp.open("GET", fullUrl, true);
        
        // Setting the header as required by the new endpoint spec
        xhttp.setRequestHeader('X-Execution-Token', token);
        
        xhttp.send();
    }
});