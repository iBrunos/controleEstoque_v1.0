class Tables {
  init(connection) {
    this.connection = connection;
    this.inserir = connection;

    this.createProduct();
    this.createStock();
    this.createEntrys();
    this.createExits();
    this.createUsers();
    this.insertProducts();
    this.insertUsers();
    this.insertExits();
    this.insertEntrys();
  }

  createProduct() {
    const sql =
      "CREATE TABLE IF NOT EXISTS products (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, description text NOT NULL, inserted_by varchar(30) NOT NULL, PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS entrys (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, observation text NOT NULL, amount int NOT NULL, inserted_by varchar(30) NOT NULL, PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS exits (id int NOT NULL AUTO_INCREMENT, product varchar(30) NOT NULL, price varchar(20) NOT NULL, brand varchar(20) NOT NULL, observation text NOT NULL, amount int NOT NULL, inserted_by varchar(30) NOT NULL, PRIMARY KEY(id))";

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
      "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, user varchar(30) NOT NULL, password varchar(64) NOT NULL, level int(1) NOT NULL, email text NOT NULL, phone text NOT NULL, PRIMARY KEY(id))";

    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        //console.log("Table users was successfully created");
      }
    });
  }
  insertProducts() {
    const sql = "REPLACE INTO products (id, product, price, brand, description, inserted_by) VALUES ('1', 'Batom Vermelho', '56,95', 'Romanel', 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.', 'User 1') , ('2', 'Rímel', '32,95', 'Avon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mattis lacus sed gravida. Donec pharetra lorem nec nunc gravida consequat. Donec ac nisl accumsan, euismod ligula sed, egestas metus. Fusce condimentum ut odio venenatis bibendum. Fusce rutrum interdum justo vel bibendum. Aliquam suscipit porta felis. Nam fringilla lectus ut ante porta vestibulum. Sed sed urna ullamcorper, ultrices lorem nec, ultrices nunc. Nulla sem lacus, egestas ac molestie id, bibendum a velit. Donec libero sapien, blandit ut sodales sed, malesuada non metus.', 'User 2') , ('3', 'Pó de Banana', '22,99', 'Nutura', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed a lacus tortor. Proin vel posuere sapien. Vestibulum at pharetra leo. Nulla leo tortor, pellentesque vitae nisl a, venenatis luctus dolor. Pellentesque maximus id lectus id pharetra. Curabitur ultrices tristique rutrum. Integer ullamcorper dui tellus, vitae elementum velit commodo non. Nunc sapien augue.', 'User 3') , ('4', 'Blush em bastão', '390,55', 'Nike', 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc sed tincidunt orci, eu pharetra elit. Sed vitae neque sodales, iaculis massa sit amet, pretium ex. In nec ligula non tellus varius ornare. Pellentesque eu faucibus tortor, non efficitur enim. Donec rutrum sollicitudin nisi quis tempus. Curabitur tincidunt auctor auctor. Morbi venenatis, purus id scelerisque porta, justo sem gravida eros, id sollicitudin augue ligula ac leo. Ut turpis nisl, tincidunt sed risus a, dignissim pharetra nisi. Praesent nec dui sapien. Aliquam eget lectus erat.', 'User 4')";

    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        //console.log("Products inserted successfully");
      }
    });
  }
  insertUsers() {
    const sql = "REPLACE INTO users (id, user, password, level, email, phone) VALUES ('1', 'admin', '$2b$08$pZ7Cg1IOgCzSnw.yhmM2bueJ0bvepWL8oYFmNIE..wXQBvsWW0feO', '1', 'admin@gmail.com', '(71) 93999-8888')";

    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        //console.log("Users inserted successfully");
      }
    });
  }
  insertExits() {
    const sql = "REPLACE INTO exits (product, price, brand, observation, amount, inserted_by) VALUES ('Product 1', 10.99, 'Brand A', 'Description of Product 1', 100, 'User 1') , ('Product 2', 25.50, 'Brand B', 'Description of Product 2', 50, 'User 2') , ('Product 3', 15.75, 'Brand C', 'Description of Product 3', 75, 'User 3') , ('Product 4', 5.99, 'Brand D', 'Description of Product 4', 200, 'User 4') , ('Product 5', 50.00, 'Brand E', 'Description of Product 5', 25, 'User 5')";

    this.connection.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        //console.log("Users inserted successfully");
      }
    });
  }
  insertEntrys() {
    const sql = "REPLACE INTO entrys (product, price, brand, observation, amount, inserted_by) VALUES ('Product 1', 10.99, 'Brand A', 'Description of Product 1', 100, 'User 1') , ('Product 2', 25.50, 'Brand B', 'Description of Product 2', 50, 'User 2') , ('Product 3', 15.75, 'Brand C', 'Description of Product 3', 75, 'User 3') , ('Product 4', 5.99, 'Brand D', 'Description of Product 4', 200, 'User 4') , ('Product 5', 50.00, 'Brand E', 'Description of Product 5', 25, 'User 5')";

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