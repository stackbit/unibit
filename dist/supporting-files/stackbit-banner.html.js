module.exports = `<div id="theme-bar" class="theme-bar theme-bar-fixed theme-bar-hidden">
  <div class="theme-bar-left">
    <div class="theme-bar-name">
        {% if stackbit_banner.name %}{{ stackbit_banner.name }}{% endif %}
    </div>
  </div>
  <div class="theme-bar-center">
    {% if stackbit_banner.github_url %}
    <a
      class="theme-bar-button theme-bar-button-outlined"
      href="{% if stackbit_banner.github_url %}{{ stackbit_banner.github_url }}{% endif %}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          fill="currentColor"
          d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
        ></path>
      </svg>
      <span>Fork</span>
    </a>
    {% endif %}
    {% if stackbit_banner.create_url %}
    <a
      class="theme-bar-button theme-bar-button-primary"
      href="{{ stackbit_banner.create_url }}"
    >
      <svg fill="currentColor" viewBox="0 0 131 107">
        <defs>
          <path
            id="a"
            d="M116.6 62L66.5 89.9 15.4 62c-1.9-1.1-4.4-.3-5.4 1.6-1.1 1.9-.3 4.4 1.6 5.4l53 29c1.2.7 2.7.7 3.9 0l52-29c1.9-1.1 2.6-3.5 1.5-5.4-1.1-2-3.5-2.7-5.4-1.6zm-95-18.5l44.9-25.4 50 28.9c1.9 1.1 4.4.4 5.5-1.5 1.1-1.9.4-4.4-1.5-5.5l-52-30c-1.2-.7-2.7-.7-4 0l-53 30c-2.7 1.5-2.7 5.4 0 7l53 30c1.9 1.1 4.4.4 5.5-1.5 1.1-1.9.4-4.4-1.5-5.5L21.6 43.5zM1 64.5v-20c-.4-4.6 1.7-9.3 6.3-11.9l53-30c3.9-2.2 8.6-2.2 12.4.1l52 30c4.3 2.5 6.6 7.2 6.2 11.8v20c.4 4.7-2 9.5-6.4 11.9l-52 29c-3.8 2.1-8.3 2.1-12.1 0l-53-29C3 74 .7 69.3 1 64.5z"
          />
        </defs>
        <use fill-rule="evenodd" xlink:href="#a" />
      </svg>
      <span>New Site</span>
    </a>
    {% endif %}
  </div>
  <div class="theme-bar-right">
    <button
      id="remove-theme-bar"
      class="theme-bar-button theme-bar-button-link"
    >
      <svg viewBox="0 0 320 512" class="remove-icon">
        <path
          fill="currentColor"
          d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
        ></path>
      </svg>
    </button>
  </div>
</div>

<script>
  var body = document.querySelector("body");
  var themebar = document.querySelector("#theme-bar");
  var hideThemeBar = sessionStorage.getItem('hideThemeBar');
  if (body && !hideThemeBar) {
    body.classList.add("has-theme-bar");
    themebar.classList.remove("theme-bar-hidden");
  }
  document
    .querySelector("#remove-theme-bar")
    .addEventListener("click", function(e) {
      e.preventDefault();
      body.classList.remove("has-theme-bar");
      themebar.classList.add("theme-bar-hidden");
      sessionStorage.setItem('hideThemeBar', true);
    });
</script>
`;