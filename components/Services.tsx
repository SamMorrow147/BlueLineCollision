import Image from "next/image";

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/blueline/rs_w_600_h_300_cg_true_aHR0cHM6.jpg"
              alt="Auto collision repair service"
              width={600}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-eurostile text-gray-900">
              Blue Line Collision Center
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 font-eurostile">
              Expert Auto Collision Repair
            </h3>
            <p className="text-gray-700 leading-relaxed font-eurostile">
              At Blue Line Collision Center, we are a family-owned business committed to providing exceptional service and top-quality results. With free estimates, a lifetime guarantee, and hassle-free insurance claim handling, we make the repair process easy and stress-free for our customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
