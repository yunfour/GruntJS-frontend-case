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
    "imgUrl": "http://ww3.sinaimg.cn/bmiddle/693974d4gw1ehaa6s6ovjj2050050mx0.jpg"
}