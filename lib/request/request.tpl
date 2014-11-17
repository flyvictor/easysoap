<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope
    xmlns:soap="<%= envelope.soap_env%>"
    <% if (envelope.namespaces !== null) { %>
        <% _.each(envelope.namespaces, function(namespace) { %>
            <% if (namespace.full !== void 0) { %>
            xmlns:<%=namespace.short%>="<%=namespace.full%>"
            <% } %>
        <% }); %>
    <% } %>>

    <% if (head !== null) { %>
        <soap:Header>
            <% _.each(head, function(headItem) { %>
                <%= headItem%>
            <% }); %>
        </soap:Header>
    <% } %>

    <soap:Body>
        <% if (body.namespace !== null) {%>
            <<%= body.namespace%>:<%=body.method%>>
        <% } else {%>
            <<%=body.method%>>
        <% } %>

            <% if (body.params !== false) {%>
                <%= body.params%>
            <% } %>

        <% if (body.namespace !== null) {%>
            </<%= body.namespace%>:<%=body.method%>>
        <% } else { %>
            </<%=body.method%>>
        <% } %>
    </soap:Body>

</soap:Envelope>
