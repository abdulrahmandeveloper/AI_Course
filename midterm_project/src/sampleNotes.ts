export type SampleNote = { id: string; title: string; subject: string; text: string }

const sampleNotes: SampleNote[] = [
  {
    id: 'cell-biology',
    title: 'Cell biology basics',
    subject: 'Biology',
    text: `The mitochondria produce most of the cell's ATP through aerobic respiration. Chlorophyll captures light energy during photosynthesis in the chloroplasts of plant cells. DNA, or deoxyribonucleic acid, stores genetic information in nearly all living organisms. Charles Darwin proposed the theory of natural selection in 1859. Ribosomes build proteins by reading messenger RNA in the cytoplasm. The cell membrane controls which substances enter and leave the cell.`,
  },
  {
    id: 'french-revolution',
    title: 'The French Revolution',
    subject: 'History',
    text: `The French Revolution began in 1789 when the Estates-General met at Versailles. Revolutionaries stormed the Bastille prison in Paris on 14 July 1789. The Declaration of the Rights of Man and of the Citizen was adopted in August 1789. King Louis XVI was executed by guillotine in January 1793. Maximilien Robespierre led the Committee of Public Safety during the Reign of Terror. Napoleon Bonaparte seized power in 1799 and later crowned himself emperor.`,
  },
  {
    id: 'newton-laws',
    title: "Newton's laws of motion",
    subject: 'Physics',
    text: `Isaac Newton published his three laws of motion in the Principia in 1687. The first law states that an object stays at rest or in uniform motion unless a force acts on it. The second law says that force equals mass multiplied by acceleration. The third law states that every action has an equal and opposite reaction. The newton is the SI unit of force. Gravity near the surface of the Earth accelerates objects at about 9.8 metres per second squared.`,
  },
  {
    id: 'computer-networks',
    title: 'How the internet works',
    subject: 'Computer science',
    text: `The Internet Protocol assigns an address to every device on a network. The Domain Name System translates names such as example.com into IP addresses. Tim Berners-Lee invented the World Wide Web at CERN in 1989. The Transmission Control Protocol guarantees that packets arrive in order. HTTPS encrypts web traffic using Transport Layer Security. A router forwards packets between different networks.`,
  },
]

export default sampleNotes
