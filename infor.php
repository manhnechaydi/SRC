<?php
require 'conect.php';
if(isset($_POST['agree-btn']))
{
    $user = $_POST['user'];
    echo"<pre>";
    print_r($_POST);

    $sql = "INSERT INTO `tbl_user` (`user`) VALUES('$user')"; 
    
    if($conn->query($sql)===TRUE)
    {
        echo "Lưu thành công";
    }
    else
    {
        echo "Lỗi {$sql}".$conn->error;
    }
}
?>