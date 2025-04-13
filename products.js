// Load database library
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb+srv://24uglyandrew:weaklings162@testcluster.jcuqa.mongodb.net/myWebsiteDB?retryWrites=true&w=majority&appName=testcluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define product model
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    category: String
}));

// List of products
const products = [
    // Plumbing product
    {
        img: "6inch-red-plumb-bob.jpeg",
        name: "6 inch Red Plumb Bob",
        price: "69₱",
        category: "Plumbing"
    },
    // Construction product
    {
        img: "BEARING UNIT UCP204 34.jpg",
        name: "Bearing Unit UCP204 34",
        price: "70₱",
        category: "Construction"
    },
    // Construction product
    {
        img: "BEARING UNIT UCP205 1.jpg",
        name: "Bearing Unit UCP205 1",
        price: "72₱",
        category: "Construction"
    },
    // Home improvement product
    {
        img: "BUFFING PASTE GREEN FOR STAINLESS.jpg",
        name: "Buffing Paste Green (For Stainless)",
        price: "75₱",
        category: "Home Improvement"
    },
    // Home improvement product
    {
        img: "BUTTERFLY HINGE 1 2 2 3 4 rename nalang sa size.jpg",
        name: "Butterfly Hinge",
        price: "79₱",
        category: "Home Improvement"
    },
    // Construction product
    {
        img: "CUP BRUSH 1.25MM PLAIN.jpg",
        name: "Cup Brush 1.25MM (Plain)",
        price: "84₱",
        category: "Construction"
    },
    // Home improvement product
    {
        img: "CUP HOOK 1 3 11 2 rename nalang te ha.jpg",
        name: "Cup Hook",
        price: "90₱",
        category: "Home Improvement"
    },
    // Home improvement product
    {
        img: "GLASS LOCK.jpg",
        name: "Glass Lock",
        price: "97₱",
        category: "Home Improvement"
    },
    // Construction product
    {
        img: "L-HOOK WITH RUBBER 1.jpg",
        name: "L-Hook With Rubber 1",
        price: "105₱",
        category: "Construction"
    },
    // Home improvement product
    {
        img: "PVC CABINET HANDLE 4.jpg",
        name: "PVC Cabinet Handle 4",
        price: "114₱",
        category: "Home Improvement"
    },
    // Construction product
    {
        img: "STANLEY LOOSE PIN HINGE 3 ORIGINAL.png",
        name: "Stanley Loose Pin Hinge 3 Original",
        price: "124₱",
        category: "Construction"
    },
    // Home improvement product
    {
        img: "YALE PADLOCK 25MM.jpg",
        name: "Yale Padlock 25MM",
        price: "135₱",
        category: "Home Improvement"
    },
    // Home improvement product
    {
        img: "YALE PADLOCK 30MM.jpg",
        name: "Yale Padlock 30MM",
        price: "147₱",
        category: "Home Improvement"
    },
    // New arrivals product
    {
        img: "CIRCULAR LAMP 22W SLIM TYPE.png",
        name: "Circular Lamp 22W Slim Type",
        price: "160₱",
        category: "New Arrivals"
    },
    // New arrivals product
    {
        img: "FUSE BOX 30A   SAFETY SWICTH.jpg",
        name: "Fuse Box 30A Safety Switch",
        price: "174₱",
        category: "New Arrivals"
    },
    // Plumbing product
    {
        img: "GI COUPLING REDUCER.jpg",
        name: "GI Coupling Reducer",
        price: "189₱",
        category: "Plumbing"
    },
    // New arrivals product
    {
        img: "NEMA 3R  PLUG IN.jpg",
        name: "Nema 3R Plug In",
        price: "205₱",
        category: "New Arrivals"
    },
    // New arrivals product
    {
        img: "PDX WIRE.jpg",
        name: "PDX Wire",
        price: "222₱",
        category: "New Arrivals"
    }
];

// Add products to database
Product.insertMany(products)
    .then(() => {
        console.log('Products added successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error adding products:', err);
        mongoose.connection.close();
    });
