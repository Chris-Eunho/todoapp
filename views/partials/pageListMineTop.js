let top = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To do List</title>
    <style>
        body { width: 50%; margin: 0 auto; font-family: Verdana, Geneva, Tahoma, sans-serif;}
        form {border: 1px solid teal; padding: 10px;}
        label { background-color: teal; color: white; padding: 3px;}
        h1 { background-color:  rgb(61, 138, 238); color: white; padding: 20px; margin-bottom: 5px;}
        a {font-size: 15px; margin-left : 20px; font-weight:normal;}
        p { margin-top: 5px; margin-bottom: 5px;}
        #allItems {margin-right : 60px; margin-left : 30px;}
        img {float: left; border-radius : 70px;}
        ul {float: left;}
    </style>
</head>
<body>
    <h1> To do Items <a href=/>Logout</a> </h1>
    <p> <a href=/list/all id="allItems">All Items</a>  <a href=/list/mine>My Items</a> </p>
    <form action='/list/mine' method="POST">
        <input type='text' name='item'>
        <input type="submit" value="submit" />
    </form>
    <br>
`;

module.exports = top;