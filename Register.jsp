<html>
  <head>
    <title>Create Account:3</title>
    <link href="Layouts.css" rel="stylesheet" type = "text/css"  />

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
	alert("Please Enter Contact No");
	formObj.t3.focus();
	return false;
	}
	if(formObj.t4.value.length==0)
	{
	alert("Please Enter Email ID");
	formObj.t4.focus();
	return false;
	}
	var email = formObj.t4.value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
		alert('enter a valid email address');
		formObj.t4.focus();
		return false;
	}
	if(formObj.t5.value.length==0)
	{
	alert("Please Enter address");
	formObj.t5.focus();
	return false;
	}
	formObj.actionUpdateData.value="update";
	return true;
	}
	</script>
  <table  align="center">
  <tr><td><font size="" color="black"><b>Username</b></td><td><input type="text" name="t1"/></td></tr>

  <tr><td><font size="" color="black"><b>Password</b></td><td><input type="password" name="t2" /></td></tr>

  <tr><td><font size="" color="black"><b>Contact&nbsp;No</b></td><td><input type="text" name="t3" /></td></tr>

  <tr><td><font size="" color="black"><b>Email ID</b></td><td><input type="text" name="t4" /></td></tr>

  <tr><td><font size="" color="black"><b>Address</b></td><td><input type="text" name="t5" size="80"/></td></tr>

  <tr><td></td><td><input type="submit" value="Register">
  </td>

  </table><br/><br/>



</style>

    </body>
  </head>
</html>
