import clientPromise from '../../lib/mongodb';

export const Login = async (username: string, password: string) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const user = await db.collection("user").findOne({username, password});
    if (user) {
      let buff = new Buffer(JSON.stringify({id: user._id, username: user.username}));
      let token = buff.toString('base64');
  
      return {
        success: true,
        token,
      };
    } else {
      return {
        success: false,
        error: true,
        message: 'Shit! You fucked up!'
      }
    }
  } catch (error) {
    console.error(error);
  }
}