class Tables {
  init(connection) {
    this.connection = connection;
    this.inserir = connection;

    this.createProduct();
    this.createStock();
    this.createEntrys();
    this.createExits();
    this.createUsers();
    this.insertProdutcs();
    this.insertUsers(); 
  }

  createProduct() {
    const sql =
      "CREATE TABLE IF NOT EXISTS product (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, description text NOT NULL, amount int NOT NULL, PRIMARY KEY(id))";

    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        //console.log("Table product was successfully created");
      }
    });
  }

createStock() {
  const sql =
    "CREATE TABLE IF NOT EXISTS stock (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, description text NOT NULL, entrys int NOT NULL, exits int NOT NULL, amount int NOT NULL, PRIMARY KEY(id))";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Table stock was successfully created");
    }
  });
}
createEntrys() {
  const sql =
    "CREATE TABLE IF NOT EXISTS entrys (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, description text NOT NULL, amount int NOT NULL, inserted_by varchar(30) ,PRIMARY KEY(id))";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Table entrys was successfully created");
    }
  });
}
createExits() {
  const sql =
    "CREATE TABLE IF NOT EXISTS entrys (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, description text NOT NULL, amount int NOT NULL, inserted_by varchar(30) ,PRIMARY KEY(id))";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Table entrys was successfully created");
    }
  });
}
createUsers() {
  const sql =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, user varchar(30) NOT NULL, password varchar(8) NOT NULL, level int(1) NOT NULL, PRIMARY KEY(id))";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Table users was successfully created");
    }
  });
}
insertProdutcs() {
  const sql = "REPLACE INTO product (id, product, price, brand, description, amount) VALUES ('1', 'Batom Vermelho', '56,95', 'Romanel', 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.', '0') , ('2', 'Rímel', '32,95', 'Avon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mattis lacus sed gravida. Donec pharetra lorem nec nunc gravida consequat. Donec ac nisl accumsan, euismod ligula sed, egestas metus. Fusce condimentum ut odio venenatis bibendum. Fusce rutrum interdum justo vel bibendum. Aliquam suscipit porta felis. Nam fringilla lectus ut ante porta vestibulum. Sed sed urna ullamcorper, ultrices lorem nec, ultrices nunc. Nulla sem lacus, egestas ac molestie id, bibendum a velit. Donec libero sapien, blandit ut sodales sed, malesuada non metus.', '0') , ('3', 'Pó de Banana', '22,99', 'Nutura', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed a lacus tortor. Proin vel posuere sapien. Vestibulum at pharetra leo. Nulla leo tortor, pellentesque vitae nisl a, venenatis luctus dolor. Pellentesque maximus id lectus id pharetra. Curabitur ultrices tristique rutrum. Integer ullamcorper dui tellus, vitae elementum velit commodo non. Nunc sapien augue, pretium pellentesque lacus et, elementum auctor mi.', '0') , ('4', 'Blush em bastão', '390,55', 'Nike', 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc sed tincidunt orci, eu pharetra elit. Sed vitae neque sodales, iaculis massa sit amet, pretium ex. In nec ligula non tellus varius ornare. Pellentesque eu faucibus tortor, non efficitur enim. Donec rutrum sollicitudin nisi quis tempus. Curabitur tincidunt auctor auctor. Morbi venenatis, purus id scelerisque porta, justo sem gravida eros, id sollicitudin augue ligula ac leo. Ut turpis nisl, tincidunt sed risus a, dignissim pharetra nisi. Praesent nec dui sapien. Aliquam eget lectus erat.', '0')";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Products inserted successfully");
    }
  });
}
insertUsers() {
  const sql = "REPLACE INTO users (id, user, password, level) VALUES ('1', 'admin', 'admin', '1') , ('2', 'bruno', 'admin', '2') , ('3', 'victor', 'admin', '3')";

  this.connection.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      //console.log("Users inserted successfully");
    }
  });
}
}
module.exports = new Tables();