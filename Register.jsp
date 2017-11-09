<html>
  <head>
    <title>Create Account:3</title>


    <h2>Create an account </h2>
    <body>
<style>
</style>
<script language="javascript">
	function validate(formObj)
	{
	if(formObj.t1.value.length==0)
	{
	alert("Please Enter user name");
	formObj.t1.focus();
	return false;
	}
	if(formObj.t2.value.length==0)
	{
	alert("Please Enter Password");
	formObj.t2.focus();
	return false;
	}
	if(formObj.t3.value.length==0)
	{
	alert("Please Enter Email address");
	formObj.t3.focus();
	return false;
	}
	var email = formObj.t3.value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
		alert('enter a valid email address');
		formObj.t4.focus();
		return false;
	}
	formObj.actionUpdateData.value="update";
	return true;
	}
	</script>
  <form name="f1" method="post" action="Register" onsubmit="return validate(this);">
    <h1 align="center"><font size="" color="#FFF">User Login Screen</h1><br/>

  	<%
  	String res = request.getParameter("t1");
  	if(res != null){
  		out.println("<font size=3 color=black><center>"+res+"</center>");
  	}%>


  <table  align="center">
  <tr><td><font size="" color="black"><b>Username</b></td><td><input type="text" name="t1"/></td></tr>

  <tr><td><font size="" color="black"><b>Password</b></td><td><input type="password" name="t2" /></td></tr>

  <tr><td><font size="" color="black"><b>Email address</b></td><td><input type="text" name="t3" /></td></tr>

  <tr><td></td><td><input type="submit" value="Register.jsp">
  </td>

  </table><br/><br/>



</style>

    </body>
  </head>
</html>
