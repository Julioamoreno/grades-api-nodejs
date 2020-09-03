// import mongoose from 'mongoose';
export default mongoose => {
	const Schema = mongoose.Schema;

	var grade = new Schema({
		name: { type: String, required: true },
		subject: { type: String, required: true },
		type: { type: String, required: true },
		value: { type: Number, required: true },
		lastModified: { type: Date, required: true },
	});

	const modelGrade = mongoose.model('grades', grade, 'grades');
	return modelGrade;
};
