<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <title>Survey</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="styles/index.css" />
        <link rel="icon" type="image/png" href="images/icon.png" />
    </head>

    <body>
        <main>
            <img src="images/settings.svg" alt="" id="settings" />
            <fieldset id="input">
                <legend>Survey</legend>
                <form method="post" action="webresources/survey">
                    <label for="key">What is your favorite programming language?</label>
                    <ul>
                        <c:forTokens items="${initParam['keys']}" delims="," var="key">
                            <li><input type="radio" name="key" value="${key}" />
                                ${key}</li>
                        </c:forTokens>
                    </ul>
                    <input type="submit" value="Submit" /> <input type="submit" value="Results" id="results"
                        formaction="results.jsp" />
                </form>
            </fieldset>
        </main>
    </body>

    </html>