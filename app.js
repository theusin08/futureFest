const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const url = "mongodb://localhost:27017/";
const dbName = 'amazonaverde';
const produtosCollection = 'produtos';
const usuariosCollection = 'usuarios';

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function connectToDB() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/produtos', async (req, res) => {
    const produto = req.body;
    const db = await connectToDB();
    const collection = db.collection(produtosCollection);

    try {
        const result = await collection.insertOne(produto);
        res.status(201).json({ _id: result.insertedId, ...produto });
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        res.status(500).send('Erro ao cadastrar produto. Por favor, tente novamente mais tarde.');
    }
});


app.get('/produtos', async (req, res) => {
    const db = await connectToDB();
    const collection = db.collection(produtosCollection);

    try {
        const produtos = await collection.find().toArray();
        res.json(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).send('Erro ao buscar produtos. Por favor, tente novamente mais tarde.');
    }
});

app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connectToDB();
    const collection = db.collection(produtosCollection);

    try {
        const result = await collection.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).send('Produto excluído com sucesso.');
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao excluir produto:', err);
        res.status(500).send('Erro ao excluir produto. Por favor, tente novamente mais tarde.');
    }
});

app.get('/oncaPintada', (req, res) => {
    res.sendFile(path.join(__dirname, 'oncaPintada.html'));
});

app.get('/ararajuba', (req, res) => {
    res.sendFile(path.join(__dirname, 'ararajuba.html'));
});

app.get('/ariranha', (req, res) => {
    res.sendFile(path.join(__dirname, 'ariranha.html'));
});

app.get('/botoCorDeRosa', (req, res) => {
    res.sendFile(path.join(__dirname, 'botoCorDeRosa.html'));
});

app.get('/GatoMaracaja', (req, res) => {
    res.sendFile(path.join(__dirname, 'GatoMaracaja.html'));
});

app.get('/gaviaoReal', (req, res) => {
    res.sendFile(path.join(__dirname, 'gaviaoReal.html'));
});

app.get('/macacoAranha', (req, res) => {
    res.sendFile(path.join(__dirname, 'macacoAranha.html'));
});

app.get('/macacoPrego', (req, res) => {
    res.sendFile(path.join(__dirname, 'macacoPrego.html'));
});

app.get('/oncaParda', (req, res) => {
    res.sendFile(path.join(__dirname, 'oncaParda.html'));
});

app.get('/peixeBoi', (req, res) => {
    res.sendFile(path.join(__dirname, 'peixeBoi.html'));
});

app.get('/sauimDeColeira', (req, res) => {
    res.sendFile(path.join(__dirname, 'sauimDeColeira.html'));
});

app.get('/uacari', (req, res) => {
    res.sendFile(path.join(__dirname, 'uacari.html'));
});

app.get('/updateDados', (req, res) => {
    res.sendFile(path.join(__dirname, 'updateDados.html'));
});

app.get('/planos', (req, res) => {
    res.sendFile(path.join(__dirname, 'planos.html'));
});

app.post('/usuarios', async (req, res) => {
    const usuario = req.body;
    const db = await connectToDB();
    const collection = db.collection(usuariosCollection);

    try {
        const result = await collection.insertOne(usuario);
        const novoUsuario = await collection.findOne({ _id: result.insertedId });
        res.status(201).json(novoUsuario);
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
    }
});

app.post('/chat', async (req, res) => {
    const userInput = req.body.userInput;

    try {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Olá! Você está procurando informações sobre ${userInput}?`);
            }, 1000);
        });

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar a mensagem do chatbot.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});

