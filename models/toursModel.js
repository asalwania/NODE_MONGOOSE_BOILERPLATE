const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A tour must have a name"],
            unique: true,
            trim: true,
            maxlength: [
                40,
                "A tour name must have less or equal 40 characters",
            ],
            minlength: [
                10,
                "A tour name must have more or equal 10 characters",
            ],
            // validate: [validator.isAlpha,"Tour name must only conatains characters"],
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, "A tour must have a duration"],
        },
        maxGroupSize: {
            type: Number,
            required: [true, "A tour must have a group size"],
        },
        difficulty: {
            type: String,
            required: [true, "A tour must have a difficulty"],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: "Difficulty should be easy, medium or difficult",
            },
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be below 5.0"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "A tour must have a price"],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    // this only work with create not for update
                    return val < this.price;
                },
                message:
                    "Discount price (${VALUE}) should be less than regular price",
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, "A tour must have a summary"],
        },
        summary: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, "A tour must have a conver image"],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// virtual properties
tourSchema.virtual("durationWeeks").get(function () {
    return this.duration / 7;
});

// mongoose document middleware

// this will work on save and create only not on insertMany
tourSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre("save", function (next) {
//     console.log('Saving the document.....')
//     next();
// });

// tourSchema.post("save", function (doc, next) {
//     console.log(doc);
//     next();
// });

// Query middleware
tourSchema.pre("/^find/", function (next) {
    // this will work for all queries start with find
    this.find({ secretTour: { $ne: true } });
    next();
});

// Aggregation middleware
tourSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
