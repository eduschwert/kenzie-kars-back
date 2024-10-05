import AppDataSource from "../data-source";
import { User, Vehicle, Address, Image, Comment } from "../entities";

const seed = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const imageRepository = AppDataSource.getRepository(Image);
  const commentRepository = AppDataSource.getRepository(Comment);

  const addresses = [
    {
      cep: "90050200",
      state: "RS",
      city: "Porto Alegre",
      street: "Rua dos Andradas",
      number: "1234",
      complement: "Frente ao prédio em construção",
    },
    {
      cep: "01010000",
      state: "SP",
      city: "São Paulo",
      street: "Avenida Paulista",
      number: "1000",
    },
    {
      cep: "30130000",
      state: "MG",
      city: "Belo Horizonte",
      street: "Praça da Liberdade",
      number: "50",
    },
    {
      cep: "70040900",
      state: "DF",
      city: "Brasília",
      street: "Esplanada dos Ministérios",
      number: "1",
      complement: "Frente a loja de informática",
    },
    {
      cep: "40020000",
      state: "BA",
      city: "Salvador",
      street: "Rua Chile",
      number: "450",
    },
    {
      cep: "60060000",
      state: "CE",
      city: "Fortaleza",
      street: "Avenida Beira Mar",
      number: "2000",
    },
    {
      cep: "80010900",
      state: "PR",
      city: "Curitiba",
      street: "Rua XV de Novembro",
      number: "1300",
    },
    {
      cep: "50060000",
      state: "PE",
      city: "Recife",
      street: "Avenida Boa Viagem",
      number: "1500",
      complement: "Predio Branco",
    },
    {
      cep: "29010000",
      state: "ES",
      city: "Vitória",
      street: "Avenida Nossa Senhora dos Navegantes",
      number: "200",
    },
    {
      cep: "69010000",
      state: "AM",
      city: "Manaus",
      street: "Rua Eduardo Ribeiro",
      number: "100",
      complement: "Frente ao prédio em construção",
    },
    {
      cep: "64000000",
      state: "PI",
      city: "Teresina",
      street: "Rua Simplício Mendes",
      number: "500",
    },
    {
      cep: "58010000",
      state: "PB",
      city: "João Pessoa",
      street: "Avenida Epitácio Pessoa",
      number: "1200",
      complement: "Casa verde",
    },
    {
      cep: "65000000",
      state: "MA",
      city: "São Luís",
      street: "Rua Grande",
      number: "800",
    },
    {
      cep: "86000000",
      state: "PR",
      city: "Londrina",
      street: "Avenida Higienópolis",
      number: "900",
    },
    {
      cep: "79002000",
      state: "MS",
      city: "Campo Grande",
      street: "Rua Barão do Rio Branco",
      number: "700",
      complement: "Frente ao prédio em construção",
    },
    {
      cep: "78010000",
      state: "MT",
      city: "Cuiabá",
      street: "Avenida Mato Grosso",
      number: "600",
    },
    {
      cep: "69020000",
      state: "AM",
      city: "Manaus",
      street: "Rua Henrique Martins",
      number: "140",
    },
    {
      cep: "89100000",
      state: "SC",
      city: "Blumenau",
      street: "Rua XV de Novembro",
      number: "200",
      complement: "Prédio Marine",
    },
    {
      cep: "13000000",
      state: "SP",
      city: "Campinas",
      street: "Avenida Francisco Glicério",
      number: "120",
    },
    {
      cep: "84000000",
      state: "PR",
      city: "Ponta Grossa",
      street: "Rua Bonifácio Vilela",
      number: "220",
      complement: "Frente ao prédio em construção",
    },
  ];

  const createdAdresses = addressRepository.create(addresses);
  await addressRepository.save(createdAdresses);

  const usersSellers = [
    {
      name: "João da Silva",
      email: "joao.silva@example.com",
      password: "12345a",
      cpf: "12345678909",
      phone: "51987654321",
      birthdate: "1990-05-15",
      description: "Vendedor de carros com 10 anos de experiência.",
      isSeller: true,
      address: createdAdresses[0],
    },
    {
      name: "Ana Costa",
      email: "ana.costa@example.com",
      password: "passwordAna!",
      cpf: "22233344455",
      phone: "51988223344",
      birthdate: "1988-10-10",
      description: "Vendedora de veículos premium.",
      isSeller: true,
      address: createdAdresses[1],
    },
    {
      name: "Juliana Mendes",
      email: "juliana.mendes@example.com",
      password: "julianaM123",
      cpf: "44455566677",
      phone: "51987775511",
      birthdate: "1995-03-12",
      description: "Especialista em vendas de carros esportivos.",
      isSeller: true,
      address: createdAdresses[2],
    },
    {
      name: "Fernanda Cardoso",
      email: "fernanda.cardoso@example.com",
      password: "fernandaC123",
      cpf: "66677788899",
      phone: "51988997722",
      birthdate: "1993-11-05",
      description: "Consultora automotiva.",
      isSeller: true,
      address: createdAdresses[3],
    },
    {
      name: "Patrícia Souza",
      email: "patricia.souza@example.com",
      password: "patriciaS123",
      cpf: "88899900011",
      phone: "51987764433",
      birthdate: "1991-04-30",
      description: "Vendedora especializada em carros populares.",
      isSeller: true,
      address: createdAdresses[4],
    },
    {
      name: "Gabriel Martins",
      email: "gabriel.martins@example.com",
      password: "gabrielM2023",
      cpf: "99911122233",
      phone: "51988445566",
      birthdate: "1985-12-11",
      description: "Vendedor focado em carros híbridos.",
      isSeller: true,
      address: createdAdresses[5],
    },
    {
      name: "Ricardo Albuquerque",
      email: "ricardo.albuquerque@example.com",
      password: "ricardoA1234",
      cpf: "11133344455",
      phone: "51985556677",
      birthdate: "1989-07-22",
      description: "Consultor especializado em vendas de SUVs.",
      isSeller: true,
      address: createdAdresses[6],
    },
    {
      name: "Beatriz Lima",
      email: "beatriz.lima@example.com",
      password: "beatrizL!pass",
      cpf: "22244455566",
      phone: "51986667788",
      birthdate: "1996-03-18",
      description: "Vendedora de carros seminovos.",
      isSeller: true,
      address: createdAdresses[7],
    },
    {
      name: "Marcelo Andrade",
      email: "marcelo.andrade@example.com",
      password: "marcelo@2023",
      cpf: "33355566677",
      phone: "51987778899",
      birthdate: "1983-04-05",
      description: "Vendedor com experiência em carros de luxo.",
      isSeller: true,
      address: createdAdresses[8],
    },
    {
      name: "Tatiana Borges",
      email: "tatiana.borges@example.com",
      password: "tatianaB2024",
      cpf: "44466677788",
      phone: "51988889900",
      birthdate: "1990-02-27",
      description: "Consultora automotiva focada em carros compactos.",
      isSeller: true,
      address: createdAdresses[9],
    },
  ];

  const usersNotSellers = [
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      password: "senhaSegura123",
      cpf: "09876543211",
      phone: "51998877665",
      birthdate: "1985-08-25",
      isSeller: false,
      address: createdAdresses[10],
    },
    {
      name: "Carlos Souza",
      email: "carlos.souza@example.com",
      password: "minhaSenha123",
      cpf: "11122233344",
      phone: "51999112233",
      birthdate: "1992-03-30",
      isSeller: false,
      address: createdAdresses[11],
    },
    {
      name: "Roberto Lima",
      email: "roberto.lima@example.com",
      password: "robertoLima123",
      cpf: "33344455566",
      phone: "51987334455",
      birthdate: "1975-07-14",
      isSeller: false,
      address: createdAdresses[12],
    },
    {
      name: "Lucas Fernandes",
      email: "lucas.fernandes@example.com",
      password: "senhaSeguraLucas",
      cpf: "55566677788",
      phone: "51988776644",
      birthdate: "1982-09-20",
      isSeller: false,
      address: createdAdresses[13],
    },
    {
      name: "Rafael Silva",
      email: "rafael.silva@example.com",
      password: "rafaelS123",
      cpf: "77788899900",
      phone: "51987654332",
      birthdate: "1987-06-18",
      isSeller: false,
      address: createdAdresses[14],
    },
    {
      name: "Cláudia Pereira",
      email: "claudia.pereira@example.com",
      password: "claudiaP2024",
      cpf: "12332145678",
      phone: "51991223344",
      birthdate: "1994-12-05",
      isSeller: false,
      address: createdAdresses[15],
    },
    {
      name: "Renato Dias",
      email: "renato.dias@example.com",
      password: "renatoD2023",
      cpf: "23456789012",
      phone: "51992334455",
      birthdate: "1986-01-19",
      isSeller: false,
      address: createdAdresses[16],
    },
    {
      name: "Elaine Costa",
      email: "elaine.costa@example.com",
      password: "elaineC123",
      cpf: "98765432100",
      phone: "51993445566",
      birthdate: "1991-11-21",
      isSeller: false,
      address: createdAdresses[17],
    },
    {
      name: "Fernando Alves",
      email: "fernando.alves@example.com",
      password: "fernandoA2024",
      cpf: "34567890123",
      phone: "51994556677",
      birthdate: "1990-02-13",
      isSeller: false,
      address: createdAdresses[18],
    },
    {
      name: "Camila Rocha",
      email: "camila.rocha@example.com",
      password: "camilaR123",
      cpf: "45678901234",
      phone: "51995667788",
      birthdate: "1988-06-27",
      isSeller: false,
      address: createdAdresses[19],
    },
  ];

  const createdUsersSellers = userRepository.create(usersSellers);
  const createdUsersNotSellers = userRepository.create(usersNotSellers);
  await userRepository.save(createdUsersSellers);
  await userRepository.save(createdUsersNotSellers);
  console.log("Usuários criados com sucesso!");

  const vehicles = [
    {
      brand: "chevrolet",
      model: "bolt ev premier 203cv (elétrico)",
      year: "2022",
      fuel: 3,
      mileage: 4000,
      fipePrice: 282045,
      color: "Preto",
      description: "Carro elétrico com ótimo desempenho.",
      price: 282045,
      coverImage: "https://i.imgur.com/UWAyq3d.jpg",
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "fiat",
      model: "argo drive 1.0 6v flex",
      year: "2022",
      fuel: 1,
      mileage: 25000,
      color: "Branco",
      price: 70000,
      description: "Carro em ótimo estado",
      coverImage: "https://i.imgur.com/6a6dtJB.jpeg",
      fipePrice: 77578,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "renault",
      model: "captur intense bose 2.0 16v flex 5p aut.",
      year: "2022",
      fuel: 1,
      mileage: 10000,
      color: "Vermelho",
      price: 125000,
      description: "Carro em estado de novo",
      coverImage: "https://i.imgur.com/h6wBE1r.jpeg",
      fipePrice: 120145,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "peugeot",
      model: "3008 allure 1.6 turbo 16v 5p aut.",
      year: "2020",
      fuel: 1,
      mileage: 45000,
      color: "Laranja",
      price: 150000,
      description:
        "Carro esportivo de alta performance, perfeito para estradas.",
      coverImage: "https://i.imgur.com/HbgSSt7.jpeg",
      fipePrice: 176756,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "toyota",
      model: "corolla altis/a.premiu. 2.0 flex 16v aut",
      year: "2022",
      fuel: 1,
      mileage: 62000,
      color: "Preto",
      price: 176000,
      description:
        "Sedan de luxo com tecnologia de ponta e interior confortável.",
      coverImage: "https://i.imgur.com/y1BUFEu.jpeg",
      fipePrice: 174360,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "volkswagen",
      model: "jetta comfort. 250 tsi 1.4 flex 16v aut.",
      year: "2020",
      fuel: 1,
      mileage: 10000,
      color: "Branco",
      price: 132000,
      description:
        "Jetta Comfortline 250 TSI 1.4 Flex 16V Automático, combinando desempenho esportivo com conforto e sofisticação. Motor turbo eficiente, design elegante e tecnologia de ponta para uma experiência de condução superior.",
      coverImage: "https://i.imgur.com/vsJgk3v.jpeg",
      fipePrice: 133800,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "renault",
      model: "kwid intense 1.0 flex 12v 5p mec.",
      year: "2022",
      fuel: 1,
      mileage: 1000,
      color: "Branco",
      price: 65000,
      description:
        "Compacto e econômico, o Renault Kwid Intense é perfeito para o trânsito urbano. Seu design moderno e altura elevada garantem segurança e praticidade. Equipado com direção elétrica e multimídia, é um dos mais acessíveis de sua categoria.",
      coverImage: "https://i.imgur.com/P5GlTLl.jpeg",
      fipePrice: 66007,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "renault",
      model: "logan authentique flex 1.0 12v 4p",
      year: "2020",
      fuel: 1,
      mileage: 5500,
      color: "Vermelho",
      price: 55000,
      description:
        "O Renault Logan Authentique 2020 é a escolha perfeita para quem busca um sedã compacto, econômico e confortável. Com seu motor 1.0 flex de alta eficiência, oferece ótimo consumo de combustível, ideal para o uso urbano e viagens curtas.",
      coverImage: "https://i.imgur.com/GxeKd1o.jpeg",
      fipePrice: 52077,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "nissan",
      model: "kicks exclusive 1.6 16v flex aut.",
      year: "2022",
      fuel: 1,
      mileage: 105000,
      color: "Vermelho",
      price: 145000,
      description:
        "Com o Nissan Kicks Exclusive 2022, você experimenta um SUV moderno e espaçoso, perfeito para a vida urbana e viagens longas. Seu motor 1.6 flex e câmbio automático oferecem uma direção suave e sem esforço.",
      coverImage: "https://i.imgur.com/pfs1x6Q.jpeg",
      fipePrice: 144276,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "honda",
      model: "city sedan ex 1.5 flex 16v 4p aut.",
      year: "2022",
      fuel: 1,
      mileage: 32500,
      color: "Cinza",
      price: 112000,
      description:
        "O Honda City EX 2022 combina elegância e performance com seu motor 1.5 flex e transmissão automática. Ideal para quem valoriza conforto, segurança e um design moderno, o City oferece espaço interno de sobra e muita tecnologia embarcada.",
      coverImage: "https://i.imgur.com/NzqerFu.jpeg",
      fipePrice: 111538,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "citroën",
      model: "ë-jumpy cargo 136cv (elétrico)",
      year: "2022",
      fuel: 3,
      mileage: 126500,
      color: "Branco",
      price: 300000,
      description:
        "O Citroën ë-Jumpy Cargo elétrico é a opção ideal para quem busca sustentabilidade sem abrir mão de capacidade de carga. Com 136cv de potência e uma autonomia excelente, é perfeito para o transporte urbano com zero emissões de poluentes.",
      coverImage: "https://i.imgur.com/zED2hfk.jpeg",
      fipePrice: 329165,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "honda",
      model: "accord sedan 2.0 tb 16v aut. (híbrido)",
      year: "2022",
      fuel: 2,
      mileage: 14300,
      color: "Branco",
      price: 302000,
      description:
        "O Honda Accord Híbrido é a fusão perfeita entre luxo e sustentabilidade. Seu motor turbo híbrido garante uma performance impressionante com economia de combustível, proporcionando uma experiência de condução refinada e eficiente.",
      coverImage: "https://i.imgur.com/D36OQyI.jpeg",
      fipePrice: 319905,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "toyota",
      model: "corolla cross se 1.8 16v aut. (híbrido)",
      year: "2022",
      fuel: 2,
      mileage: 2500,
      color: "Branco",
      price: 213500,
      description:
        "O Toyota Corolla Cross SE Híbrido combina a confiabilidade da marca com tecnologia de ponta em eficiência energética. Perfeito para quem busca um SUV com excelente desempenho, conforto e economia no consumo de combustível.",
      coverImage: "https://i.imgur.com/2QViIfI.jpeg",
      fipePrice: 214274,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "volkswagen",
      model: "gol 1.6 msi flex 16v 5p aut.",
      year: "2022",
      fuel: 1,
      mileage: 55000,
      color: "Cinza",
      price: 80000,
      description:
        "O Volkswagen Gol MSI 2022 é sinônimo de versatilidade e robustez. Equipado com motor 1.6 flex, ele oferece uma excelente experiência de condução, seja na cidade ou na estrada, com a durabilidade que só o Gol pode oferecer.",
      coverImage: "https://i.imgur.com/nUWs27Y.jpeg",
      fipePrice: 88870,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "hyundai",
      model: "creta attitude plus 1.6 16v flex aut.",
      year: "2020",
      fuel: 1,
      mileage: 10000,
      color: "Preto",
      price: 88000,
      description:
        "O Hyundai Creta Attitude Plus 2020 é um SUV compacto com grande estilo e conforto. Com motor 1.6 flex e câmbio automático, ele é ideal para quem busca espaço interno, tecnologia e performance no dia a dia.",
      coverImage: "https://i.imgur.com/dk7cGkG.jpeg",
      fipePrice: 88581,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "toyota",
      model: "corolla cross se 1.8 16v aut. (híbrido)",
      year: "2022",
      fuel: 2,
      mileage: 5600,
      color: "Azul",
      price: 213500,
      description:
        "Com o Toyota Corolla Cross SE Híbrido, você tem o melhor da eficiência energética e do desempenho. Seu design robusto combinado com a economia do motor híbrido faz dele um SUV perfeito para quem busca inovação.",
      coverImage: "https://i.imgur.com/vvi69P5.jpeg",
      fipePrice: 214274,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "toyota",
      model: "corolla cross se 1.8 16v aut. (hybrid)",
      year: "2022",
      fuel: 2,
      mileage: 43200,
      color: "Branco",
      price: 178500,
      description:
        "Este Toyota Corolla Cross Híbrido é a escolha perfeita para quem busca economia e performance. Seu motor híbrido eficiente e sua robustez o tornam ideal para qualquer tipo de terreno.",
      coverImage: "https://i.imgur.com/E9pGyzF.jpeg",
      fipePrice: 189322,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "peugeot",
      model: "city sedan ex 1.5 flex 16v 4p aut.",
      year: "2022",
      fuel: 1,
      mileage: 2000,
      color: "Vermelho",
      price: 215000,
      description:
        "Com seu design moderno e sofisticado, o Peugeot City Sedan 2022 é uma excelente escolha para quem busca conforto e estilo. Seu motor 1.5 flex oferece boa performance com baixo consumo.",
      coverImage: "https://i.imgur.com/19BStiN.jpeg",
      fipePrice: 219392,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "ford",
      model: "ecosport 100 anos 1.5 flex 5p aut.",
      year: "2020",
      fuel: 1,
      mileage: 132000,
      color: "Azul",
      price: 80000,
      description:
        "A Ford Ecosport 100 Anos é uma edição especial do icônico SUV compacto. Com motor 1.5 flex, ela oferece ótimo desempenho e versatilidade, sendo perfeita para aventuras urbanas e na estrada.",
      coverImage: "https://i.imgur.com/45OSfJ1.jpeg",
      fipePrice: 86610,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "volkswagen",
      model: "gol 1.0 flex 12v 5p",
      year: "2022",
      fuel: 1,
      mileage: 95000,
      color: "Cinza",
      price: 73250,
      description:
        "O Volkswagen Gol 1.0 Flex 2022 é um dos carros mais populares do Brasil, e com razão. Simples, prático e econômico, é perfeito para o dia a dia, oferecendo durabilidade e baixo custo de manutenção.",
      coverImage: "https://i.imgur.com/sUwtRoM.jpeg",
      fipePrice: 74785,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "volkswagen",
      model: "golf gti 350 tsi 2.0 230cv 16v aut.",
      year: "2019",
      fuel: 1,
      mileage: 24500,
      color: "Preto",
      price: 200000,
      description:
        "O Volkswagen Golf GTI 2019 é a combinação perfeita de esportividade e conforto. Equipado com um motor 2.0 TSI de 230cv, ele oferece uma condução emocionante com desempenho dinâmico e design refinado. Ideal para quem busca um hatchback com alto desempenho.",
      coverImage: "https://i.imgur.com/GYpBI7w.jpeg",
      fipePrice: 216488,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
    {
      brand: "citroën",
      model: "grand c4 picasso intensive 1.6 tb aut.",
      year: "2019",
      fuel: 1,
      mileage: 46500,
      color: "Branco",
      price: 132500,
      description:
        "O Citroën Grand C4 Picasso 2019 é um veículo ideal para famílias que buscam conforto, espaço e tecnologia. Seu motor 1.6 turbo garante uma condução suave, enquanto o interior espaçoso e a vasta gama de funcionalidades tornam cada viagem mais agradável.",
      coverImage: "https://i.imgur.com/d8zdVpD.jpeg",
      fipePrice: 138439,
      user: createdUsersSellers[Math.floor(Math.random() * 10)],
    },
  ];

  const vehiclesWithGoodBuy = vehicles.map((vehicle) => ({
    ...vehicle,
    isGoodBuy: vehicle.price <= vehicle.fipePrice * 0.95,
  }));

  const createdVehicles = vehicleRepository.create(vehiclesWithGoodBuy);
  await vehicleRepository.save(createdVehicles);
  console.log("Veículos criados com sucesso!");

  const images = [
    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/zPZclr7.jpeg",
      vehicle: createdVehicles[1],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/MWgQ9w9.jpeg",
      vehicle: createdVehicles[1],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/pwLDN5m.jpeg",
      vehicle: createdVehicles[2],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/YtqVLET.jpeg",
      vehicle: createdVehicles[2],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/Kw4Sxi4.jpeg",
      vehicle: createdVehicles[2],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/W03uH6v.jpeg",
      vehicle: createdVehicles[2],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/YWMIDkv.jpeg",
      vehicle: createdVehicles[3],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/tB1SHL0.jpeg",
      vehicle: createdVehicles[3],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/0AGKyuz.jpeg",
      vehicle: createdVehicles[3],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/vATGld9.jpeg",
      vehicle: createdVehicles[3],
    },
    {
      imageNumber: 5,
      imageUrl: "https://i.imgur.com/XyG5dof.jpeg",
      vehicle: createdVehicles[3],
    },
    {
      imageNumber: 6,
      imageUrl: "https://i.imgur.com/en91ilu.jpeg",
      vehicle: createdVehicles[3],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/ukgbcIG.jpeg",
      vehicle: createdVehicles[4],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/SEZLcAM.jpeg",
      vehicle: createdVehicles[4],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/E4NSuHT.jpeg",
      vehicle: createdVehicles[4],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/oaGZME1.jpeg",
      vehicle: createdVehicles[4],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/pPOz0H0.jpeg",
      vehicle: createdVehicles[5],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/uViMyVZ.jpeg",
      vehicle: createdVehicles[5],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/FR4xHdi.jpeg",
      vehicle: createdVehicles[5],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/IwTLEdv.jpeg",
      vehicle: createdVehicles[5],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/yWOrXRC.jpeg",
      vehicle: createdVehicles[6],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/umkGdbs.jpeg",
      vehicle: createdVehicles[6],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/LgAbFmC.jpeg",
      vehicle: createdVehicles[6],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/XuCIzgx.jpeg",
      vehicle: createdVehicles[6],
    },
    {
      imageNumber: 5,
      imageUrl: "https://i.imgur.com/s2urGjc.jpeg",
      vehicle: createdVehicles[6],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/yWOrXRC.jpeg",
      vehicle: createdVehicles[8],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/ygo9QO9.jpeg",
      vehicle: createdVehicles[9],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/wxh2iFl.jpeg",
      vehicle: createdVehicles[9],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/r8BbubM.jpeg",
      vehicle: createdVehicles[10],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/ljzApxi.jpeg",
      vehicle: createdVehicles[10],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/yktyFXH.jpeg",
      vehicle: createdVehicles[10],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/mfFlyeZ.jpeg",
      vehicle: createdVehicles[11],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/HBxC9qb.jpeg",
      vehicle: createdVehicles[11],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/LkyJuaH.jpeg",
      vehicle: createdVehicles[11],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/WNqp9l3.jpeg",
      vehicle: createdVehicles[11],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/Su4dN9q.jpeg",
      vehicle: createdVehicles[12],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/x0OOklS.jpeg",
      vehicle: createdVehicles[12],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/AhE2OFB.jpeg",
      vehicle: createdVehicles[12],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/Dq1E8Dy.jpeg",
      vehicle: createdVehicles[12],
    },
    {
      imageNumber: 5,
      imageUrl: "https://i.imgur.com/00uVecQ.jpeg",
      vehicle: createdVehicles[12],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/jhCZz4O.jpeg",
      vehicle: createdVehicles[13],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/wbPY2kN.jpeg",
      vehicle: createdVehicles[14],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/D9AT6rc.jpeg",
      vehicle: createdVehicles[14],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/Y664VyR.jpeg",
      vehicle: createdVehicles[15],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/E47otUq.jpeg",
      vehicle: createdVehicles[15],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/DbqxhtN.jpeg",
      vehicle: createdVehicles[16],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/UQIPNB2.jpeg",
      vehicle: createdVehicles[16],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/TLJtytY.jpeg",
      vehicle: createdVehicles[17],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/QOdqcrK.jpeg",
      vehicle: createdVehicles[17],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/9D7weuc.jpeg",
      vehicle: createdVehicles[17],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/9D7weuc.jpeg",
      vehicle: createdVehicles[18],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/IIUO3uS.jpeg",
      vehicle: createdVehicles[18],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/C3jf301.jpeg",
      vehicle: createdVehicles[19],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/ohl370v.jpeg",
      vehicle: createdVehicles[19],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/gZH1zHH.jpeg",
      vehicle: createdVehicles[19],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/hJPyNur.jpeg",
      vehicle: createdVehicles[20],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/1Q1DHLa.jpeg",
      vehicle: createdVehicles[20],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/sBqJMot.jpeg",
      vehicle: createdVehicles[20],
    },

    {
      imageNumber: 1,
      imageUrl: "https://i.imgur.com/Gxf3eH8.jpeg",
      vehicle: createdVehicles[21],
    },
    {
      imageNumber: 2,
      imageUrl: "https://i.imgur.com/C4LgvlG.jpeg",
      vehicle: createdVehicles[21],
    },
    {
      imageNumber: 3,
      imageUrl: "https://i.imgur.com/FbtaYQg.jpeg",
      vehicle: createdVehicles[21],
    },
    {
      imageNumber: 4,
      imageUrl: "https://i.imgur.com/zJv928o.jpeg",
      vehicle: createdVehicles[21],
    },
  ];

  const createdImages = imageRepository.create(images);
  await imageRepository.save(createdImages);
  console.log("Imagens criadas com sucesso!");

  const comments = [
    {
      content: "Ótimo veículo, exatamente o que eu procurava!",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Muito bem conservado, excelente compra.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Preço justo pelo que o carro oferece.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O vendedor foi muito atencioso e prestativo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A performance desse carro é incrível!",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A negociação foi tranquila, recomendo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O carro tem alguns detalhes a serem corrigidos, mas nada grave.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "Adorei o design do interior, muito confortável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O consumo de combustível é ótimo!",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "Veículo em excelente estado de conservação.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O vendedor foi muito paciente e esclareceu todas as minhas dúvidas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Bom negócio, estou satisfeito com a compra.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Carro com um excelente custo-benefício.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A entrega foi rápida e o carro está impecável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "Senti que o carro poderia estar mais limpo, mas fora isso, está ótimo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Parece um carro novo, muito bem cuidado.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Tive uma experiência muito boa, o vendedor foi excelente.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O carro tem tudo que eu procurava em termos de potência.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Não tive problemas durante a negociação, tudo correu bem.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Amei o carro, ele supera minhas expectativas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O design deste carro é incrível, combina com o meu estilo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A negociação foi rápida e eficiente, recomendo o vendedor.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O conforto é excepcional, ótimo para viagens longas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro entrega uma ótima performance em qualquer terreno.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Tudo como descrito no anúncio, o veículo está impecável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O consumo de combustível é melhor do que eu esperava.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Transação muito segura, o vendedor foi bastante prestativo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "A aceleração deste carro é insana, recomendo para quem gosta de potência.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro veio com todos os opcionais que eu procurava.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A entrega foi rápida e o carro está em perfeitas condições.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Fiquei impressionado com o estado de conservação, parece novo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse é o melhor carro que já comprei, estou muito satisfeito.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A negociação foi clara e sem surpresas. Excelente experiência.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content:
        "O som deste carro é incrível, ótimo para ouvir música em alta qualidade.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro é muito espaçoso, ideal para minha família.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "Recomendo o vendedor, tudo foi feito de maneira muito profissional.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "A estabilidade na estrada é fantástica, me sinto muito seguro dirigindo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A estética do carro é moderna e muito bem conservada.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Fiquei surpreso com o preço, foi um ótimo negócio.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A tecnologia embarcada nesse carro é de última geração.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O motor é muito silencioso, proporcionando uma direção agradável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O atendimento do vendedor foi excelente, me senti muito bem atendido.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse carro é muito econômico, perfeito para o meu dia a dia.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content:
        "O ar-condicionado é super eficiente, até em dias muito quentes.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Todo o processo de compra foi rápido e sem complicações.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A pintura está impecável, parece que saiu da fábrica ontem.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A suspensão desse carro é perfeita, absorve bem os impactos.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "Senti muita confiança ao comprar deste vendedor, tudo foi transparente.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O carro tem muitos recursos tecnológicos que facilitam a direção.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O desempenho do motor é incrível, responde muito rápido.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A qualidade do som é impressionante, muito claro e potente.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O espaço interno é ótimo para viagens longas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O acabamento em couro faz toda a diferença no conforto.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Fiquei surpreso com a potência desse carro.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Excelente custo-benefício, o carro está impecável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro tem um design moderno e muito elegante.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A direção é muito leve, o que facilita bastante nas manobras.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Gostei bastante dos sistemas de segurança do carro.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O vendedor foi muito atencioso e esclareceu todas as dúvidas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse carro tem tudo que eu precisava, muito satisfeito.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A transmissão automática é muito suave, adorei.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro é espaçoso e confortável para a família toda.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O carro é perfeito para quem gosta de velocidade e segurança.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O ar condicionado digital faz toda a diferença no conforto.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Foi uma das melhores compras que já fiz, recomendo muito.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Os bancos são muito confortáveis, até em viagens longas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O painel digital é intuitivo e fácil de usar.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O carro é perfeito para quem gosta de velocidade e segurança.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O ar condicionado digital faz toda a diferença no conforto.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Foi uma das melhores compras que já fiz, recomendo muito.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Os bancos são muito confortáveis, até em viagens longas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O painel digital é intuitivo e fácil de usar.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "O carro tem um design moderno e muito elegante.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A direção é muito leve, o que facilita bastante nas manobras.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Gostei bastante dos sistemas de segurança do carro.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "O vendedor foi muito atencioso e esclareceu todas as dúvidas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse carro tem tudo que eu precisava, muito satisfeito.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A transmissão automática é muito suave, adorei.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A transmissão automática é muito suave, adorei.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A transmissão automática é muito suave, adorei.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A transmissão automática é muito suave, adorei.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "Veículo em excelente estado de conservação.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O vendedor foi muito paciente e esclareceu todas as minhas dúvidas.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Bom negócio, estou satisfeito com a compra.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Carro com um excelente custo-benefício.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "A entrega foi rápida e o carro está impecável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A tecnologia embarcada nesse carro é de última geração.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O motor é muito silencioso, proporcionando uma direção agradável.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "O atendimento do vendedor foi excelente, me senti muito bem atendido.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse carro é muito econômico, perfeito para o meu dia a dia.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content:
        "Recomendo o vendedor, tudo foi feito de maneira muito profissional.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content:
        "A estabilidade na estrada é fantástica, me sinto muito seguro dirigindo.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content: "A estética do carro é moderna e muito bem conservada.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },

    {
      content:
        "O atendimento do vendedor foi excelente, me senti muito bem atendido.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
    {
      content: "Esse carro é muito econômico, perfeito para o meu dia a dia.",
      vehicle: createdVehicles[Math.floor(Math.random() * 22)],
      user: createdUsersNotSellers[Math.floor(Math.random() * 10)],
    },
  ];

  const createdComments = commentRepository.create(comments);
  await commentRepository.save(createdComments);
  console.log("Comentários criados com sucesso!");

  await AppDataSource.destroy();
};

seed().catch((err) => {
  console.error("Erro ao popular o banco de dados", err);
  AppDataSource.destroy();
});
