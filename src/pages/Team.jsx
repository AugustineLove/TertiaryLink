import React from 'react';

const teamMembers = [
  {
    name: 'Augustine Love Stephens',
    role: 'Founder & Lead Developer',
    image: '/team/love.jpg',
    bio: 'Full-stack engineer and visionary behind Tertiary Link, focused on solving Ghana’s higher-ed challenges.',
    linkedin: 'https://linkedin.com/in/love-stephens',
    github: 'https://github.com/love-stephens',
  },
  {
    name: 'Angela Doe',
    role: 'Research & Content Lead',
    image: '/team/angela.jpg',
    bio: 'Passionate about educational equity and user-centered research.',
    linkedin: 'https://linkedin.com/in/angela-doe',
    github: '',
  },
  {
    name: 'Kwame Boateng',
    role: 'Frontend Designer',
    image: '/team/kwame.jpg',
    bio: 'Specialized in clean UI/UX tailored to African students’ needs.',
    linkedin: 'https://linkedin.com/in/kwame-boateng',
    github: 'https://github.com/kwame-boateng',
  },
  {
    name: 'Nana Yaa Mensah',
    role: 'Marketing & Outreach',
    image: '/team/nanayaa.jpg',
    bio: 'Ensures students and schools hear about Tertiary Link through the right channels.',
    linkedin: 'https://linkedin.com/in/nana-yaa-mensah',
    github: '',
  },
];

const TeamPage = () => {
  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
        <p className="text-gray-600 mb-12">
          Passionate individuals working together to transform tertiary education access in Ghana.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                src={member.image}
                alt={member.name}
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
              <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
              <div className="flex justify-center mt-4 space-x-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-gray-700 text-md">
            Want to collaborate with us?{' '}
            <a href="/contact" className="text-blue-600 underline hover:text-blue-800">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
