import clientPromise from '../../lib/mongodb';

export const UpdateChat = async (chat: object) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    await db.collection("chat").insertOne(chat);
    const chats = await db.collection("chat").find({}).limit(50).toArray();
    if (chats) {
      return {
        success: true,
        chats: chats,
      };
    } else {
      return {
        success: false,
        error: true,
        message: 'Invalid message!'
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const GetChat = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const chats = await db.collection("chat").find({}).limit(50).toArray();
    if (chats) {
      return {
        success: true,
        chats: chats,
      };
    } else {
      return {
        success: false,
        error: true,
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const DeleteAllChat = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const chats = await db.collection("chat").deleteMany({});
    if (chats) {
      return {
        success: true,
        chats: chats,
      };
    } else {
      return {
        success: false,
        error: true,
      }
    }
  } catch (error) {
    console.error(error);
  }
}