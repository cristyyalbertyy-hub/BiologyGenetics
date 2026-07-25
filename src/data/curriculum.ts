/** Currículo — tema → subtópico (conforme mapas mentais). */

import { mediaUrl } from '../utils/mediaUrl'

export const APP_TITLE = 'Biology'

export const courseTitle = APP_TITLE

export const OVERVIEW_IMAGE = '/BiologyVertical.png'



export interface Leaf {

  id: string

  title: string

}



export interface Chapter {

  id: string

  title: string

  /** Theme bar colour (HA palette). */

  color: string

  leaves: Leaf[]

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

 * <TEMA>_<SUBTOPICO>_<TIPO>.<ext>

 * Exemplo de CT dentro de CF:

 * CF_CT_V.mp4 / CF_CT_P.m4a / CF_CT_I.png / CF_CT_Q.csv

 */

const MEDIA_OVERRIDES: Record<string, MediaByLeaf> = {

  'cell-fundamentals:cell-theory': {

    video: '/media/CF_CT_V.mp4',

    podcast: '/media/CF_CT_P.m4a',

    infografic: '/media/CF_CT_I.png',

    questionnaire: '/media/CF_CT_Q.csv',

  },

  'cell-fundamentals:macromolecules': {

    video: '/media/CF_M_V.mp4',

    podcast: '/media/CF_M_P.m4a',

    infografic: '/media/CF_M_I.png',

    questionnaire: '/media/CF_M_Q.csv',

  },

  'cell-fundamentals:prokaryotic-vs-eukaryotic': {

    video: '/media/CF_PE_V.mp4',

    podcast: '/media/CF_PE_P.m4a',

    infografic: '/media/CF_PE_I.png',

    questionnaire: '/media/CF_PE_Q.csv',

  },

  'cell-fundamentals:viruses': {

    video: '/media/CF_V_V.mp4',

    podcast: '/media/CF_V_P.m4a',

    infografic: '/media/CF_V_I.png',

    questionnaire: '/media/CF_V_Q.csv',

  },

  'cell-structure-function:plasma-membrane': {

    video: '/media/CSF_PM_V.mp4',

    podcast: '/media/CSF_PM_P.m4a',

    infografic: '/media/CSF_PM_I.png',

    questionnaire: '/media/CSF_PM_Q.csv',

  },

  'cell-structure-function:organelles': {

    video: '/media/CSF_O_V.mp4',

    podcast: '/media/CSF_O_P.m4a',

    infografic: '/media/CSF_O_I.png',

    questionnaire: '/media/CSF_O_Q.csv',

  },

  'cell-structure-function:cytoskeleton': {

    video: '/media/CSF_C_V.mp4',

    podcast: '/media/CSF_C_P.m4a',

    infografic: '/media/CSF_C_I.png',

    questionnaire: '/media/CSF_C_Q.csv',

  },

  'cell-structure-function:mitochondria': {

    video: '/media/CSF_M_V.mp4',

    podcast: '/media/CSF_M_P.m4a',

    infografic: '/media/CSF_M_I.png',

    questionnaire: '/media/CSF_M_Q.csv',

  },

  'molecular-biology:dna-structure-duplication': {

    video: '/media/MB_DSD_V.mp4',

    podcast: '/media/MB_DSD_P.m4a',

    infografic: '/media/MB_DSD_I.png',

    questionnaire: '/media/MB_DSD_Q.csv',

  },

  'molecular-biology:rna-transcription': {

    video: '/media/MB_RT_V.mp4',

    podcast: '/media/MB_RT_P.m4a',

    infografic: '/media/MB_RT_I.png',

    questionnaire: '/media/MB_RT_Q.csv',

  },

  'molecular-biology:protein-synthesis': {

    video: '/media/MB_PS_V.mp4',

    podcast: '/media/MB_PS_P.m4a',

    infografic: '/media/MB_PS_I.png',

    questionnaire: '/media/MB_PS_Q.csv',

  },

  'molecular-biology:gene-expression-control': {

    video: '/media/MB_GEC_V.mp4',

    podcast: '/media/MB_GEC_P.m4a',

    infografic: '/media/MB_GEC_I.png',

    questionnaire: '/media/MB_GEC_Q.csv',

  },

  'cellular-processes:cell-trafficking': {

    video: '/media/CP_CT_V.mp4',

    podcast: '/media/CP_CT_P.m4a',

    infografic: '/media/CP_CT_I.png',

    questionnaire: '/media/CP_CT_Q.csv',

  },

  'cellular-processes:mitosis-meiosis': {

    video: '/media/CP_MM_V.mp4',

    podcast: '/media/CP_MM_P.m4a',

    infografic: '/media/CP_MM_I.png',

    questionnaire: '/media/CP_MM_Q.csv',

  },

  'cellular-processes:cell-death': {

    video: '/media/CP_CD_V.mp4',

    podcast: '/media/CP_CD_P.m4a',

    infografic: '/media/CP_CD_I.png',

    questionnaire: '/media/CP_CD_Q.csv',

  },

  'cellular-processes:cell-signaling': {

    video: '/media/CP_S_V.mp4',

    podcast: '/media/CP_S_P.m4a',

    infografic: '/media/CP_S_I.png',

    questionnaire: '/media/CP_S_Q.csv',

  },

  'cancer-biology:proto-oncogenes': {

    video: '/media/CB_P_V.mp4',

    podcast: '/media/CB_P_P.m4a',

    infografic: '/media/CB_P_I.png',

    questionnaire: '/media/CB_P_Q.csv',

  },

  'cancer-biology:tumour-transformation': {

    video: '/media/CB_TT_V.mp4',

    podcast: '/media/CB_TT_P.m4a',

    infografic: '/media/CB_TT_I.png',

    questionnaire: '/media/CB_TT_Q.csv',

  },

  'cancer-biology:tumour-suppressors': {

    video: '/media/CB_TS_V.mp4',

    podcast: '/media/CB_TS_P.m4a',

    infografic: '/media/CB_TS_I.png',

    questionnaire: '/media/CB_TS_Q.csv',

  },

}



export const chapters: Chapter[] = [

  {

    id: 'cell-fundamentals',

    title: 'Cell Fundamentals',

    color: '#14213d',

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

    color: '#2d4636',

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

    color: '#d36b31',

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

    color: '#1a535c',

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

    color: '#5c4033',

    leaves: [

      {

        id: 'tumour-transformation',

        title: 'Tumour Transformation',

      },

      { id: 'proto-oncogenes', title: 'Proto-oncogenes' },

      { id: 'tumour-suppressors', title: 'Tumour Suppressors' },

    ],

  },

]



export function findChapter(chapterId: string): Chapter | undefined {

  return chapters.find((c) => c.id === chapterId)

}



export function findLeaf(chapterId: string, leafId: string): Leaf | undefined {

  return findChapter(chapterId)?.leaves.find((leaf) => leaf.id === leafId)

}



export function getMediaForLeaf(chapterId: string, leafId: string): MediaByLeaf {

  const key = `${chapterId}:${leafId}`

  const raw =
    MEDIA_OVERRIDES[key] ?? {
      video: DEMO_MEDIA.video,
      podcast: DEMO_MEDIA.podcast,
      infografic: DEMO_MEDIA.infografic,
      questionnaire: DEMO_MEDIA.questionnaire,
    }

  return {
    video: mediaUrl(raw.video),
    podcast: mediaUrl(raw.podcast),
    infografic: mediaUrl(raw.infografic),
    questionnaire: mediaUrl(raw.questionnaire),
  }

}



export type LessonSelection = {

  chapterId: string

  leafId: string

}



export type ResolvedLesson = {

  chapter: Chapter

  leaf: Leaf

  media: MediaByLeaf

}



export function resolveLesson(selection: LessonSelection): ResolvedLesson | null {

  const chapter = findChapter(selection.chapterId)

  const leaf = findLeaf(selection.chapterId, selection.leafId)

  if (!chapter || !leaf) return null

  return {

    chapter,

    leaf,

    media: getMediaForLeaf(selection.chapterId, selection.leafId),

  }

}


