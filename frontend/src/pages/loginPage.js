const LoginPage = () =>{
    const loginPageStyles = {
        display : 'flex',
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        gap : "24px",
        margin : "auto",
        padding : "24px",
    }
    return (
        <div style={loginPageStyles}>  
            <h1>LOGIN</h1>
            <input type="text" />
            <input type="password" />
            <button>login</button>
        </div>
    )
}

export default LoginPage;