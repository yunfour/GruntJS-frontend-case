<%@ page contentType="text/html; charset=utf-8" language="java" errorPage="" %>
<%@ page import="java.util.*" %>
<%
    //String reply = request.getParameter("reply");
    //String msgId = request.getParameter("msgId");
    //String userId = request.getParameter("userId");
    
    try {
        Thread.sleep(5000); 
    }catch(Exception e) {
    
    }

/*
{
    "status": "-1",
    "message": "图片尺寸太大"
}
*/
%>
{
    "status": "1",
    "data": "http://ww4.sinaimg.cn/bmiddle/8a20733ejw1ehb5d57at2j20rs15oqce.jpg"
}