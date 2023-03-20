export default function Login() {
  
    return (
        <>

        <section class="titleAndLogin">
        <section class="title__text"/>
          
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <h3 class="animate-charcter">Happy Makeup</h3>
                </div>
              </div>
            </div>
            
            <p class="title__text--p1">Gerenciamento do Estoque.</p>
            <h2 class="title__text--h2">Bem vindo(a),</h2>
            <p class="title__text--p2">Para continuar efetue o login na rede.</p>
        <section/>
        <main class="login"/>
            <form name="myForm" class="login__form" id="form__id"/>
                <h3 class="login__form--title">Login</h3>
                <div class="login__form--user"/>
                    <input type="text" placeholder="Usuário" name="Uname" class="user" id="user"/>
                    <img src="assets/imgs/iconUser.svg" alt="Ícone" id="user__icon"/>
                <div/>
                <div class="login__form--password"/>
                    <input type="password" name="Pass" id="password" placeholder="Senha" class="password"/>
                    <img src="assets/imgs/iconPass.svg" alt="Ícone" id="password__icon"/>
                <div/>
                <p class="login__error">&nbsp;<br/>&nbsp;</p>
                <input type="submit" value="Entrar" class="continue" id="continue"/>
            <form/>
        <main/>
    </section>
    </>
    );
  }



