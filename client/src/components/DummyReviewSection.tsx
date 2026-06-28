import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Karan P.",
    date: "16 Jun 2026",
    rating: 5,
    review:
      "Arrived in perfect condition. Very satisfied with the purchase, ordering more soon.",
    helpful: 12,
  },
  {
    id: 2,
    name: "Rahul M.",
    date: "12 Jun 2026",
    rating: 5,
    review:
      "Arrived in perfect condition. Very satisfied with the purchase, ordering more soon.",
    helpful: 9,
  },
  {
    id: 3,
    name: "Rahul M.",
    date: "5 Jun 2026",
    rating: 4,
    review:
      "Pretty good! Not the absolute best I've had, but definitely worth the price.",
    helpful: 10,
  },
  {
    id: 4,
    name: "Vikram J.",
    date: "29 May 2026",
    rating: 4,
    review:
      "Quality is decent but I expected it to be a bit fresher. Still a solid buy overall.",
    helpful: 3,
  },
];

const ratingData = [
  { stars: 5, count: 3 },
  { stars: 4, count: 3 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function ReviewSection() {
  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-semibold text-lime-950 mb-8">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-2 gap-10 border-b border-zinc-100 pb-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-4xl font-semibold text-lime-950">4</h3>

          <div className="flex mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={15}
                fill="#F59E0B"
                className="text-amber-500"
              />
            ))}
          </div>

          <p className="text-zinc-500 text-sm mt-2">12 reviews</p>
        </div>

        <div className="space-y-2">
          {ratingData.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 ">
              <span className=" text-zinc-700">{item.stars}★</span>

              <div className="flex-1 h-2.5  bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full  bg-amber-500 "
                  style={{
                    width: `${(item.count / 3) * 100}%`,
                  }}
                />
              </div>

              <span className="text-zinc-700 text-sm">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
              {review.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm ">{review.name}</h4>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500 text-xs">{review.date}</span>
              </div>

              <div className="flex mt-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#F59E0B"
                    className="text-amber-500"
                  />
                ))}
              </div>

              <p className="text-zinc-700 text-sm">{review.review}</p>

              <button className="flex items-center gap-2 mt-3 text-zinc-500 hover:text-zinc-700 text-xs">
                <ThumbsUp size={14} />
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
