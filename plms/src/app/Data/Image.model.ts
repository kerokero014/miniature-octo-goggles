interface Image {
  image_id: number;
  topic_id: number;
  image_data: Buffer; // Assuming you store image data as bytes in your database
  created_at: Date;
}

export default Image;
