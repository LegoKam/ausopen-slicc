// add delayed functionality here

// ── Brand Concierge bootstrap ───────────────────────────
(function() {
  // Inject mount point if not already in DOM
  if (!document.getElementById('brand-concierge-mount')) {
    var mount = document.createElement('div');
    mount.id = 'brand-concierge-mount';
    document.body.appendChild(mount);
  }

  // Inject bc-card image style
  var style = document.createElement('style');
  style.textContent = '.bc-card__image { background-size: contain !important; background-repeat: no-repeat !important; }';
  document.head.appendChild(style);

  // Load Brand Concierge main.js
  var s = document.createElement('script');
  s.src = 'https://experience-stage.adobe.net/solutions/experience-platform-brand-concierge-web-agent/static-assets/main.js';
  s.onload = function() {
    if (window.adobe && window.adobe.concierge) {
      window.adobe.concierge.bootstrap({
        instanceName: "alloy",
        stylingConfigurations: window.styleConfiguration,
        selector: "#brand-concierge-mount",
        stickySession: false
      });
    }
  };
  document.head.appendChild(s);
})();
