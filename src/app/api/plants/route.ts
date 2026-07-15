import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/getSession";
import { ObjectId } from "mongodb";

// Initial seed data with high-quality Unsplash URLs
const initialPlants = [
  {
    title: "Monstera Deliciosa",
    shortDescription: "A beautiful tropical plant with iconic split leaves, perfect for living rooms.",
    description: "Monstera Deliciosa, commonly known as the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is widely grown in temperate zones as a houseplant.",
    price: 45,
    category: "Indoor",
    rating: 4.8,
    careLevel: "Easy",
    location: "Living Room",
    imageUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80",
    sunlight: "Indirect Light",
    watering: "Every 1-2 weeks",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Snake Plant (Sansevieria)",
    shortDescription: "Extremely resilient air-purifying plant that thrives on neglect.",
    description: "Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names. It is an excellent air purifier.",
    price: 25,
    category: "Indoor",
    rating: 4.9,
    careLevel: "Easy",
    location: "Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80",
    sunlight: "Low to Partial Light",
    watering: "Every 2-3 weeks",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Fiddle Leaf Fig",
    shortDescription: "A dramatic statement plant with large, violin-shaped glossy leaves.",
    description: "Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforests. It requires consistent light and watering schedule.",
    price: 65,
    category: "Indoor",
    rating: 4.5,
    careLevel: "Medium",
    location: "Office",
    imageUrl: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&auto=format&fit=crop&q=80",
    sunlight: "Bright Consistent Light",
    watering: "Once a week",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Peace Lily (Spathiphyllum)",
    shortDescription: "Elegant white blooms that droop to tell you exactly when they need water.",
    description: "Spathiphyllum is a genus of about 47 species of monocotyledonous flowering plants in the family Araceae, native to tropical regions of the Americas and southeastern Asia. Certain species of Spathiphyllum are commonly known as peace lilies. They are sturdy, easy to care for, and bloom beautifully.",
    price: 30,
    category: "Indoor",
    rating: 4.7,
    careLevel: "Easy",
    location: "Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&auto=format&fit=crop&q=80",
    sunlight: "Medium Indirect Light",
    watering: "Once a week (when soil is dry)",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Aloe Vera",
    shortDescription: "Useful medicinal succulent with soothing gel inside thick leaves.",
    description: "Aloe vera is a succulent plant species of the genus Aloe. Having originated in the Arabian Peninsula, it grows wild in tropical, semi-tropical, and arid climates around the world. It is cultivated for agricultural and medicinal uses. The species is also used for decorative purposes.",
    price: 18,
    category: "Succulent",
    rating: 4.9,
    careLevel: "Easy",
    location: "Balcony",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&auto=format&fit=crop&q=80",
    sunlight: "Bright Direct Light",
    watering: "Every 3 weeks",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Fresh Rosemary",
    shortDescription: "A fragrant woody herb that is perfect for cooking and home gardens.",
    description: "Salvia rosmarinus, commonly known as rosemary, is a shrub with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region. It is a member of the sage family Lamiaceae, which includes many other medicinal and culinary herbs.",
    price: 15,
    category: "Herbs",
    rating: 4.6,
    careLevel: "Medium",
    location: "Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1515589654462-a9881e276b8a?w=600&auto=format&fit=crop&q=80",
    sunlight: "Full Sun",
    watering: "Every 1-2 weeks",
    createdAt: new Date().toISOString(),
  },
  {
    title: "French Lavender",
    shortDescription: "Stunning purple blooms with a relaxing scent, ideal for patios.",
    description: "Lavandula dentata, French lavender, is a species of flowering plant in the family Lamiaceae, native to the Mediterranean, the Atlantic islands and the Arabian Peninsula. Growing to 60 cm tall, it has grey-green, linear leaves and blue-purple flowers. Its scent is highly therapeutic.",
    price: 22,
    category: "Outdoor",
    rating: 4.8,
    careLevel: "Medium",
    location: "Garden",
    imageUrl: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=600&auto=format&fit=crop&q=80",
    sunlight: "Full Direct Sun",
    watering: "Once a week",
    createdAt: new Date().toISOString(),
  },
  {
    title: "Mexican Snowball",
    shortDescription: "A rosette-forming succulent that looks like a miniature ice flower.",
    description: "Echeveria elegans, the Mexican snowball, Mexican gem or white rose, is a species of flowering plant in the family Crassulaceae, native to semi-desert areas of Mexico. It is a succulent evergreen perennial growing to 5-10 cm tall, with tight rosettes of pale blue-green fleshy leaves.",
    price: 12,
    category: "Succulent",
    rating: 4.7,
    careLevel: "Easy",
    location: "Desk",
    imageUrl: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=600&auto=format&fit=crop&q=80",
    sunlight: "Bright Sunlight",
    watering: "Every 2-3 weeks",
    createdAt: new Date().toISOString(),
  }
];

export async function GET(request: NextRequest) {
  try {
    const plantsCollection = db.collection("plants");

    // Seed if empty
    const count = await plantsCollection.countDocuments();
    if (count === 0) {
      await plantsCollection.insertMany(initialPlants);
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "1000");
    const careLevel = searchParams.get("careLevel") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt"; // priceAsc, priceDesc, ratingDesc, nameAsc
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    // Query builder
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (careLevel && careLevel !== "All") {
      query.careLevel = careLevel;
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    // Sorting
    const sort: any = {};
    if (sortBy === "priceAsc") {
      sort.price = 1;
    } else if (sortBy === "priceDesc") {
      sort.price = -1;
    } else if (sortBy === "ratingDesc") {
      sort.rating = -1;
    } else if (sortBy === "nameAsc") {
      sort.title = 1;
    } else {
      sort.createdAt = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const total = await plantsCollection.countDocuments(query);
    const plants = await plantsCollection.find(query).sort(sort).skip(skip).limit(limit).toArray();

    return NextResponse.json({
      plants,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("Error in GET /api/plants:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch plants" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const body = await request.json();
    const { title, shortDescription, description, price, category, careLevel, imageUrl, sunlight, watering, location } = body;

    if (!title || !shortDescription || !description || price === undefined || !category || !careLevel) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    const newPlant = {
      title,
      shortDescription,
      description,
      price: parseFloat(price),
      category,
      careLevel,
      location: location || "Indoor",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80",
      sunlight: sunlight || "Medium Light",
      watering: watering || "Regularly",
      rating: 5.0, // default rating
      userId: user.id,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
    };

    const plantsCollection = db.collection("plants");
    const result = await plantsCollection.insertOne(newPlant);

    return NextResponse.json({ success: true, plantId: result.insertedId }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/plants:", error);
    return NextResponse.json({ error: error.message || "Failed to create plant" }, { status: 500 });
  }
}
