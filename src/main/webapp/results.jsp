<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">

        <head>
            <title>Survey</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <base href="${pageContext.request.contextPath}/" />
            <link rel="stylesheet" type="text/css" href="styles/index.css" />
            <link rel="icon" type="image/png" href="/images/icon.png" />
        </head>

        <body>
            <main>
                <table id="output">
                    <caption>Survey Results</caption>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Progress</th>
                            <th>% of votes</th>
                            <th># of votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach items="${data.votes}" var="item" varStatus="status">
                            <tr>
                                <td>${item.key}</td>
                                <td><meter min="0" max="100" <c:if test="${item.votes != 0}">
                                        value="${100*(item.votes/data.total)}"</c:if>>&nbsp;</meter></td>
                                <td>
                                    <fmt:formatNumber value="${item.votes/data.total}" type="percent"
                                        minFractionDigits="2" />
                                </td>
                                <td>${item.votes} votes</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                                <form method="get" action="index.jsp">
                                    <input type="submit" value="Vote again" id="voteAgain" />
                                </form>
                            </th>
                            <th colspan="3">Number of votes: <span id="total">${data.total}</span>.</th>
                        </tr>
                    </tfoot>
                </table>
            </main>
        </body>

        </html>