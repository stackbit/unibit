module.exports = `<!doctype html>
<html lang="en">
    <head>    
        {% if stackbit_banner.show_banner %}<link rel="stylesheet" type="text/css" href={{ "assets/css/stackbit-banner.css" | relative_url }}>{% endif %}
        {% include "html_head.html" %}
        {% if liveReload %}<script type="text/javascript" src={{ "assets/js/live-reload.js" | relative_url }}></script>{% endif %}
    </head>
    <body{% if templates.body_class %} class="{{ templates.body_class }}"{% endif %}>
        {% if stackbit_banner.show_banner %}
            {% include stackbit_banner.component %}
        {% endif %}
        {% block body %}{% endblock %}
        {% include "post_body.html" %}
    </body> 
</html>
`;
