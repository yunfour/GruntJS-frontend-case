<%@ page contentType="text/html; charset=utf-8" language="java" errorPage="" %>
<%@ page import="java.util.*" %>
<%
    //String reply = request.getParameter("reply");
    //String msgId = request.getParameter("msgId");
    //String userId = request.getParameter("userId");
    
    try {
        Thread.sleep(2000); 
    }catch(Exception e) {
    
    }
    
    //System.out.println("操作成功！");
    //System.out.println("时间：" + new Date());
    //System.out.println("----------------------------------------------------");


//{
//    "status": "-1",
//    "message": "该条信息您没有权限删除！"
//}
%>
{
    "status": "1",
    "data": {
        "keyId": "0000212",
        "device": "测试设备xx",
        "createTime": "2014年04月15日 14:00",
        "imei": "00023300404"
    }
}