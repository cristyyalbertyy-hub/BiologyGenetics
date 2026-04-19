/** Currículo — capítulo → tema → subtópico (conforme mapas mentais). */

export const APP_TITLE = 'Biology and Genetics'

export interface Leaf {
  id: string
  title: string
}

export interface TopicGroup {
  id: string
  title: string
  leaves: Leaf[]
}

export interface Chapter {
  id: string
  title: string
  groups: TopicGroup[]
}

/** URLs de demonstração — substitua pelos seus ficheiros ou links. */
export const DEMO_MEDIA = {
  video: '/media/A_Estrutura_da_Vida.mp4',
  audio:
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  podcast: '/media/Podecast1.m4a',
  infografic: '/media/infographics1.png',
  questionnaire:
    'https://docs.google.com/forms/d/e/1FAIpQLSd0v8v9F8Vqj0M7cPzER6gqJ5Jx7T8j7l4x1v9wA7B1xw2Q/viewform',
} as const

export const chapters: Chapter[] = [
  {
    id: 'biology-syllabus',
    title: 'Biology Syllabus',
    groups: [
      {
        id: 'cell-fundamentals',
        title: 'Cell Fundamentals',
        leaves: [
          { id: 'cell-theory', title: 'Cell Theory' },
          { id: 'macromolecules', title: 'Macromolecules' },
          {
            id: 'prokaryotic-vs-eukaryotic',
            title: 'Prokaryotic vs Eukaryotic',
          },
          { id: 'viruses', title: 'Viruses' },
        ],
      },
      {
        id: 'cell-structure-function',
        title: 'Cell Structure & Function',
        leaves: [
          { id: 'plasma-membrane', title: 'Plasma Membrane' },
          { id: 'organelles', title: 'Organelles' },
          { id: 'cytoskeleton', title: 'Cytoskeleton' },
          { id: 'mitochondria', title: 'Mitochondria' },
        ],
      },
      {
        id: 'molecular-biology',
        title: 'Molecular Biology',
        leaves: [
          {
            id: 'dna-structure-duplication',
            title: 'DNA Structure & Duplication',
          },
          { id: 'rna-transcription', title: 'RNA & Transcription' },
          { id: 'protein-synthesis', title: 'Protein Synthesis' },
          {
            id: 'gene-expression-control',
            title: 'Gene Expression Control',
          },
        ],
      },
      {
        id: 'cellular-processes',
        title: 'Cellular Processes',
        leaves: [
          { id: 'cell-trafficking', title: 'Cell Trafficking' },
          { id: 'mitosis-meiosis', title: 'Mitosis & Meiosis' },
          { id: 'cell-death', title: 'Cell Death' },
          { id: 'cell-signaling', title: 'Cell Signaling' },
        ],
      },
      {
        id: 'cancer-biology',
        title: 'Cancer Biology',
        leaves: [
          {
            id: 'tumour-transformation',
            title: 'Tumour Transformation',
          },
          { id: 'proto-oncogenes', title: 'Proto-oncogenes' },
          { id: 'tumour-suppressors', title: 'Tumour Suppressors' },
        ],
      },
    ],
  },
  {
    id: 'medical-genetics',
    title: 'Medical Genetics',
    groups: [
      {
        id: 'basic-genetics',
        title: 'Basic Genetics',
        leaves: [
          { id: 'terminology', title: 'Terminology' },
          { id: 'mendelian-principles', title: 'Mendelian Principles' },
          {
            id: 'population-genetics',
            title: 'Population Genetics',
          },
        ],
      },
      {
        id: 'inheritance-models',
        title: 'Inheritance Models',
        leaves: [
          { id: 'monogenic', title: 'Monogenic' },
          { id: 'chromosomal', title: 'Chromosomal' },
          { id: 'multifactorial', title: 'Multifactorial' },
          { id: 'mitochondrial', title: 'Mitochondrial' },
        ],
      },
      {
        id: 'clinical-applications',
        title: 'Clinical Applications',
        leaves: [
          { id: 'pedigree-analysis', title: 'Pedigree Analysis' },
          { id: 'risk-calculation', title: 'Risk Calculation' },
          { id: 'genetic-diagnosis', title: 'Genetic Diagnosis' },
        ],
      },
    ],
  },
  {
    id: 'learning-outcomes',
    title: 'Learning Outcomes',
    groups: [
      {
        id: 'knowledge-understanding',
        title: 'Knowledge & Understanding',
        leaves: [{ id: 'content', title: 'Content' }],
      },
      {
        id: 'applying-knowledge',
        title: 'Applying Knowledge',
        leaves: [{ id: 'content', title: 'Content' }],
      },
      {
        id: 'communication-skills',
        title: 'Communication Skills',
        leaves: [{ id: 'content', title: 'Content' }],
      },
      {
        id: 'making-judgments',
        title: 'Making Judgments',
        leaves: [{ id: 'content', title: 'Content' }],
      },
    ],
  },
  {
    id: 'course-logistics',
    title: 'Course Logistics',
    groups: [
      {
        id: 'structure',
        title: 'Structure',
        leaves: [{ id: 'content', title: 'Content' }],
      },
      {
        id: 'assessment',
        title: 'Assessment',
        leaves: [{ id: 'content', title: 'Content' }],
      },
    ],
  },
]

export function findChapter(chapterId: string): Chapter | undefined {
  return chapters.find((c) => c.id === chapterId)
}

export function findGroup(
  chapterId: string,
  groupId: string,
): TopicGroup | undefined {
  return findChapter(chapterId)?.groups.find((g) => g.id === groupId)
}

export function findLeaf(
  chapterId: string,
  groupId: string,
  leafId: string,
): Leaf | undefined {
  const g = findGroup(chapterId, groupId)
  return g?.leaves.find((l) => l.id === leafId)
}
