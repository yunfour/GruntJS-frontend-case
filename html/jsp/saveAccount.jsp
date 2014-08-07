<%@ page contentType="text/html; charset=utf-8" language="java" errorPage="" %>
<%@ page import="java.util.*" %>
<%
    String reply = request.getParameter("name");
    String msgId = request.getParameter("value");
    
    try {
        Thread.sleep(3000);
    }catch(Exception e) {
    
    }
    

//{
//    "status": "failure",
//    "message": "该用户已已经注册"
//}
%>
{
    "status": "1"
}