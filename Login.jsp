<html>
  <head>
    <meta charset="utf-8">
    <title>Login to Meowspace</title>
    <link rel="stylesheet" type= "text/css" href="/css/master.css"> //for layouts
  </head>
  <body>
    <div class = "container">
    <div class = "header">
<center>
  <h1>Login</h1>
  <form name = "login" onsubmit="return validateForm(); "method "post">
    <ul>
      <li>Username: <input class "username" type = "text" name="username"></li>
      <li>Password: <input class "password" type = "password" name="password"></li>
    </ul>
    <input type = "button" class="submit" value="Login" name = "submit" onclick="validate()">
  </form>
</div>
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
	formObj.actionUpdateData.value="update";
	return true;
	}
	</script>
</center>
</body>
</html>
