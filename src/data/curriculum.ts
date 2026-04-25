/** Currículo — capítulo → tema → subtópico (conforme mapas mentais). */

export const APP_TITLE = 'Biology'

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
  podcast: '/media/Podecast1.m4a',
  infografic: '/media/infographics1.png',
  questionnaire:
    'https://docs.google.com/forms/d/e/1FAIpQLSd0v8v9F8Vqj0M7cPzER6gqJ5Jx7T8j7l4x1v9wA7B1xw2Q/viewform',
} as const

export type MediaByLeaf = {
  video: string
  podcast: string
  infografic: string
  questionnaire: string
}

/**
 * Convenção por iniciais:
 * <CAPITULO>_<SUBCAPITULO>_<TIPO>.<ext>
 * Exemplo de CT dentro de CF:
 * CF_CT_V.mp4 / CF_CT_P.m4a / CF_CT_I.png / CF_CT_Q.csv
 */
const MEDIA_OVERRIDES: Record<string, MediaByLeaf> = {
  'biology-syllabus:cell-fundamentals:cell-theory': {
    video: '/media/CF_CT_V.mp4',
    podcast: '/media/CF_CT_P.m4a',
    infografic: '/media/CF_CT_I.png',
    questionnaire: '/media/CF_CT_Q.csv',
  },
  'biology-syllabus:cell-fundamentals:macromolecules': {
    video: '/media/CF_M_V.mp4',
    podcast: '/media/CF_M_P.m4a',
    infografic: '/media/CF_M_I.png',
    questionnaire: '/media/CF_M_Q.csv',
  },
  'biology-syllabus:cell-fundamentals:prokaryotic-vs-eukaryotic': {
    video: '/media/CF_PE_V.mp4',
    podcast: '/media/CF_PE_P.m4a',
    infografic: '/media/CF_PE_I.png',
    questionnaire: '/media/CF_PE_Q.csv',
  },
  'biology-syllabus:cell-fundamentals:viruses': {
    video: '/media/CF_V_V.mp4',
    podcast: '/media/CF_V_P.m4a',
    infografic: '/media/CF_V_I.png',
    questionnaire: '/media/CF_V_Q.csv',
  },
  'biology-syllabus:cell-structure-function:plasma-membrane': {
    video: '/media/CSF_PM_V.mp4',
    podcast: '/media/CSF_PM_P.m4a',
    infografic: '/media/CSF_PM_I.png',
    questionnaire: '/media/CSF_PM_Q.csv',
  },
  'biology-syllabus:cell-structure-function:organelles': {
    video: '/media/CSF_O_V.mp4',
    podcast: '/media/CSF_O_P.m4a',
    infografic: '/media/CSF_O_I.png',
    questionnaire: '/media/CSF_O_Q.csv',
  },
  'biology-syllabus:cell-structure-function:cytoskeleton': {
    video: '/media/CSF_C_V.mp4',
    podcast: '/media/CSF_C_P.m4a',
    infografic: '/media/CSF_C_I.png',
    questionnaire: '/media/CSF_C_Q.csv',
  },
  'biology-syllabus:cell-structure-function:mitochondria': {
    video: '/media/CSF_M_V.mp4',
    podcast: '/media/CSF_M_P.m4a',
    infografic: '/media/CSF_M_I.png',
    questionnaire: '/media/CSF_M_Q.csv',
  },
  'biology-syllabus:molecular-biology:dna-structure-duplication': {
    video: '/media/MB_DSD_V.mp4',
    podcast: '/media/MB_DSD_P.m4a',
    infografic: '/media/MB_DSD_I.png',
    questionnaire: '/media/MB_DSD_Q.csv',
  },
  'biology-syllabus:molecular-biology:rna-transcription': {
    video: '/media/MB_RT_V.mp4',
    podcast: '/media/MB_RT_P.m4a',
    infografic: '/media/MB_RT_I.png',
    questionnaire: '/media/MB_RT_Q.csv',
  },
  'biology-syllabus:molecular-biology:protein-synthesis': {
    video: '/media/MB_PS_V.mp4',
    podcast: '/media/MB_PS_P.m4a',
    infografic: '/media/MB_PS_I.png',
    questionnaire: '/media/MB_PS_Q.csv',
  },
  'biology-syllabus:molecular-biology:gene-expression-control': {
    video: '/media/MB_GEC_V.mp4',
    podcast: '/media/MB_GEC_P.m4a',
    infografic: '/media/MB_GEC_I.png',
    questionnaire: '/media/MB_GEC_Q.csv',
  },
  'biology-syllabus:cellular-processes:cell-trafficking': {
    video: '/media/CP_CT_V.mp4',
    podcast: '/media/CP_CT_P.m4a',
    infografic: '/media/CP_CT_I.png',
    questionnaire: '/media/CP_CT_Q.csv',
  },
  'biology-syllabus:cellular-processes:mitosis-meiosis': {
    video: '/media/CP_MM_V.mp4',
    podcast: '/media/CP_MM_P.m4a',
    infografic: '/media/CP_MM_I.png',
    questionnaire: '/media/CP_MM_Q.csv',
  },
  'biology-syllabus:cellular-processes:cell-death': {
    video: '/media/CP_CD_V.mp4',
    podcast: '/media/CP_CD_P.m4a',
    infografic: '/media/CP_CD_I.png',
    questionnaire: '/media/CP_CD_Q.csv',
  },
  'biology-syllabus:cellular-processes:cell-signaling': {
    video: '/media/CP_S_V.mp4',
    podcast: '/media/CP_S_P.m4a',
    infografic: '/media/CP_S_I.png',
    questionnaire: '/media/CP_S_Q.csv',
  },
  'biology-syllabus:cancer-biology:proto-oncogenes': {
    video: '/media/CB_P_V.mp4',
    podcast: '/media/CB_P_P.m4a',
    infografic: '/media/CB_P_I.png',
    questionnaire: '/media/CB_P_Q.csv',
  },
  'biology-syllabus:cancer-biology:tumour-transformation': {
    video: '/media/CB_TT_V.mp4',
    podcast: '/media/CB_TT_P.m4a',
    infografic: '/media/CB_TT_I.png',
    questionnaire: '/media/CB_TT_Q.csv',
  },
  'biology-syllabus:cancer-biology:tumour-suppressors': {
    video: '/media/CB_TS_V.mp4',
    podcast: '/media/CB_TS_P.m4a',
    infografic: '/media/CB_TS_I.png',
    questionnaire: '/media/CB_TS_Q.csv',
  },
}

export const chapters: Chapter[] = [
  {
    id: 'biology-syllabus',
    title: 'Biology',
    groups: [
      {
        id: 'cell-fundamentals',
        title: 'Cell Fundamentals (CF)',
        leaves: [
          { id: 'cell-theory', title: 'Cell Theory (CT)' },
          { id: 'macromolecules', title: 'Macromolecules (M)' },
          {
            id: 'prokaryotic-vs-eukaryotic',
            title: 'Prokayotic vs Eukaryotic (PE)',
          },
          { id: 'viruses', title: 'Viruses (V)' },
        ],
      },
      {
        id: 'cell-structure-function',
        title: 'Cell Structure & Function',
        leaves: [
          { id: 'plasma-membrane', title: 'Plasma Membrane (PM)' },
          { id: 'organelles', title: 'Organelles (O)' },
          { id: 'cytoskeleton', title: 'Cytoskeleton (CY)' },
          { id: 'mitochondria', title: 'Mitochondria (MI)' },
        ],
      },
      {
        id: 'molecular-biology',
        title: 'Molecular Biology',
        leaves: [
          {
            id: 'dna-structure-duplication',
            title: 'DNA Structure & Duplication (DSD)',
          },
          { id: 'rna-transcription', title: 'RNA & Transcription (RT)' },
          { id: 'protein-synthesis', title: 'Protein Synthesis (PS)' },
          {
            id: 'gene-expression-control',
            title: 'Gene Expression Control (GEC)',
          },
        ],
      },
      {
        id: 'cellular-processes',
        title: 'Cellular Processes',
        leaves: [
          { id: 'cell-trafficking', title: 'Cell Trafficking (CTR)' },
          { id: 'mitosis-meiosis', title: 'Mitosis & Meiosis (MM)' },
          { id: 'cell-death', title: 'Cell Death (CD)' },
          { id: 'cell-signaling', title: 'Cell Signaling (CS)' },
        ],
      },
      {
        id: 'cancer-biology',
        title: 'Cancer Biology',
        leaves: [
          {
            id: 'tumour-transformation',
            title: 'Tumour Transformation (TT)',
          },
          { id: 'proto-oncogenes', title: 'Proto-oncogenes (PO)' },
          { id: 'tumour-suppressors', title: 'Tumour Suppressors (TS)' },
        ],
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

export function getMediaForLeaf(
  chapterId: string,
  groupId: string,
  leafId: string,
): MediaByLeaf {
  const key = `${chapterId}:${groupId}:${leafId}`
  return (
    MEDIA_OVERRIDES[key] ?? {
      video: DEMO_MEDIA.video,
      podcast: DEMO_MEDIA.podcast,
      infografic: DEMO_MEDIA.infografic,
      questionnaire: DEMO_MEDIA.questionnaire,
    }
  )
}
