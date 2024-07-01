const platforms = {
  'Instagram': {
    'notoriety': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Carrousel', details: 'Présentation de votre histoire de marque avec un carrousel.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’une citation inspirante.' },
          { day: 'Mercredi', type: 'Reels', details: 'Tutoriel de design graphique en vidéo.' },
          { day: 'Jeudi', type: 'Post', details: 'Partage d’un témoignage client.' },
          { day: 'Vendredi', type: 'Live', details: 'Live Q&A sur le design.' },
          { day: 'Samedi', type: 'Post', details: 'Post sur une étude de cas.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Carrousel', details: 'Présentation de votre histoire de marque avec un carrousel.' },
          { day: 'Jeudi', type: 'Reels', details: 'Tutoriel de design graphique en vidéo.' },
          { day: 'Samedi', type: 'Post', details: 'Post sur une étude de cas.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’une citation inspirante.' },
          { day: 'Jeudi', type: 'Live', details: 'Live Q&A sur le design.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Carrousel', details: 'Présentation de votre histoire de marque avec un carrousel.' },
          { week: 2, type: 'Reels', details: 'Tutoriel de design graphique en vidéo.' },
          { week: 3, type: 'Post', details: 'Post sur une étude de cas.' },
          { week: 4, type: 'Live', details: 'Live Q&A sur le design.' }
        ]
      }
    ],
    'engagement': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Story', details: 'Sondage en stories.' },
          { day: 'Mardi', type: 'Reels', details: 'Vidéo de défi.' },
          { day: 'Mercredi', type: 'Post', details: 'Post interactif avec questions.' },
          { day: 'Jeudi', type: 'Post', details: 'Partage d’une anecdote personnelle.' },
          { day: 'Vendredi', type: 'Live', details: 'Live de discussion avec les abonnés.' },
          { day: 'Samedi', type: 'Post', details: 'Post sur un événement récent.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Story', details: 'Sondage en stories.' },
          { day: 'Mercredi', type: 'Post', details: 'Post interactif avec questions.' },
          { day: 'Vendredi', type: 'Live', details: 'Live de discussion avec les abonnés.' },
          { day: 'Mardi', type: 'Reels', details: 'Vidéo de défi.' },
          { day: 'Jeudi', type: 'Post', details: 'Partage d’une anecdote personnelle.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Story', details: 'Sondage en stories.' },
          { week: 2, type: 'Reels', details: 'Vidéo de défi.' },
          { week: 3, type: 'Post', details: 'Post interactif avec questions.' },
          { week: 4, type: 'Live', details: 'Live de discussion avec les abonnés.' }
        ]
      }
    ]
  },
  'TikTok': {
    'notoriety': [
      {
        name: 'Plan Intensif',
        description: '1 vidéo par jour',
        content: [
          { day: 'Lundi', type: 'Vidéo', details: 'Vidéo virale.' },
          { day: 'Mardi', type: 'Vidéo', details: 'Tutoriel amusant.' },
          { day: 'Mercredi', type: 'Vidéo', details: 'Collaboration avec un créateur.' },
          { day: 'Jeudi', type: 'Vidéo', details: 'Participation à une tendance.' },
          { day: 'Vendredi', type: 'Vidéo', details: 'Vidéo de défi.' },
          { day: 'Samedi', type: 'Vidéo', details: 'Vidéo éducative.' },
          { day: 'Dimanche', type: 'Vidéo', details: 'Vidéo de remerciement aux followers.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 vidéos par semaine',
        content: [
          { day: 'Lundi', type: 'Vidéo', details: 'Vidéo virale.' },
          { day: 'Mercredi', type: 'Vidéo', details: 'Tutoriel amusant.' },
          { day: 'Vendredi', type: 'Vidéo', details: 'Vidéo de défi.' },
          { day: 'Mardi', type: 'Vidéo', details: 'Collaboration avec un créateur.' },
          { day: 'Jeudi', type: 'Vidéo', details: 'Participation à une tendance.' },
          { day: 'Dimanche', type: 'Vidéo', details: 'Vidéo éducative.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 vidéo par semaine',
        content: [
          { week: 1, type: 'Vidéo', details: 'Vidéo virale.' },
          { week: 2, type: 'Vidéo', details: 'Tutoriel amusant.' },
          { week: 3, type: 'Vidéo', details: 'Vidéo de défi.' },
          { week: 4, type: 'Vidéo', details: 'Collaboration avec un créateur.' }
        ]
      }
    ],
    'engagement': [
      {
        name: 'Plan Intensif',
        description: '1 vidéo par jour',
        content: [
          { day: 'Lundi', type: 'Vidéo', details: 'Vidéo de défi.' },
          { day: 'Mardi', type: 'Vidéo', details: 'Vidéo interactive avec questions.' },
          { day: 'Mercredi', type: 'Vidéo', details: 'Vidéo d’histoire personnelle.' },
          { day: 'Jeudi', type: 'Vidéo', details: 'Vidéo de challenge.' },
          { day: 'Vendredi', type: 'Vidéo', details: 'Vidéo éducative.' },
          { day: 'Samedi', type: 'Vidéo', details: 'Vidéo de retour d’expérience.' },
          { day: 'Dimanche', type: 'Vidéo', details: 'Vidéo de remerciement.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 vidéos par semaine',
        content: [
          { day: 'Lundi', type: 'Vidéo', details: 'Vidéo de défi.' },
          { day: 'Mercredi', type: 'Vidéo', details: 'Vidéo interactive avec questions.' },
          { day: 'Vendredi', type: 'Vidéo', details: 'Vidéo éducative.' },
          { day: 'Mardi', type: 'Vidéo', details: 'Vidéo d’histoire personnelle.' },
          { day: 'Jeudi', type: 'Vidéo', details: 'Vidéo de challenge.' },
          { day: 'Dimanche', type: 'Vidéo', details: 'Vidéo de retour d’expérience.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 vidéo par semaine',
        content: [
          { week: 1, type: 'Vidéo', details: 'Vidéo de défi.' },
          { week: 2, type: 'Vidéo', details: 'Vidéo interactive avec questions.' },
          { week: 3, type: 'Vidéo', details: 'Vidéo éducative.' },
          { week: 4, type: 'Vidéo', details: 'Vidéo de challenge.' }
        ]
      }
    ]
  },
  'Facebook': {
    'notoriety': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Publication de contenu viral ou d’actualité.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un article de blog.' },
          { day: 'Mercredi', type: 'Post', details: 'Vidéo d’un tutoriel ou d’un produit.' },
          { day: 'Jeudi', type: 'Post', details: 'Témoignage ou avis client.' },
          { day: 'Vendredi', type: 'Live', details: 'Session live pour discuter d’un sujet pertinent.' },
          { day: 'Samedi', type: 'Post', details: 'Infographie sur un sujet d’actualité.' },
          { day: 'Dimanche', type: 'Post', details: 'Contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Publication de contenu viral ou d’actualité.' },
          { day: 'Mercredi', type: 'Post', details: 'Vidéo d’un tutoriel ou d’un produit.' },
          { day: 'Vendredi', type: 'Live', details: 'Session live pour discuter d’un sujet pertinent.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un article de blog.' },
          { day: 'Jeudi', type: 'Post', details: 'Témoignage ou avis client.' },
          { day: 'Dimanche', type: 'Post', details: 'Contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Post', details: 'Publication de contenu viral ou d’actualité.' },
          { week: 2, type: 'Post', details: 'Vidéo d’un tutoriel ou d’un produit.' },
          { week: 3, type: 'Post', details: 'Témoignage ou avis client.' },
          { week: 4, type: 'Live', details: 'Session live pour discuter d’un sujet pertinent.' }
        ]
      }
    ],
    'engagement': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Question du jour pour susciter des commentaires.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' },
          { day: 'Mercredi', type: 'Post', details: 'Publication d’un sondage.' },
          { day: 'Jeudi', type: 'Post', details: 'Vidéo d’interaction avec l’audience.' },
          { day: 'Vendredi', type: 'Live', details: 'Session live pour répondre aux questions.' },
          { day: 'Samedi', type: 'Post', details: 'Publication d’un défi pour les abonnés.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’une histoire inspirante.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Question du jour pour susciter des commentaires.' },
          { day: 'Mercredi', type: 'Post', details: 'Publication d’un sondage.' },
          { day: 'Vendredi', type: 'Live', details: 'Session live pour répondre aux questions.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' },
          { day: 'Jeudi', type: 'Post', details: 'Vidéo d’interaction avec l’audience.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’une histoire inspirante.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Post', details: 'Question du jour pour susciter des commentaires.' },
          { week: 2, type: 'Post', details: 'Publication d’un sondage.' },
          { week: 3, type: 'Post', details: 'Vidéo d’interaction avec l’audience.' },
          { week: 4, type: 'Live', details: 'Session live pour répondre aux questions.' }
        ]
      }
    ]
  },
  'LinkedIn': {
    'notoriety': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Article sur les tendances de l’industrie.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un projet récent.' },
          { day: 'Mercredi', type: 'Post', details: 'Vidéo d’un témoignage client.' },
          { day: 'Jeudi', type: 'Post', details: 'Infographie sur un sujet pertinent.' },
          { day: 'Vendredi', type: 'Live', details: 'Live pour discuter des dernières tendances.' },
          { day: 'Samedi', type: 'Post', details: 'Publication d’une citation inspirante.' },
          { day: 'Dimanche', type: 'Post', details: 'Partage d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Article sur les tendances de l’industrie.' },
          { day: 'Mercredi', type: 'Post', details: 'Vidéo d’un témoignage client.' },
          { day: 'Vendredi', type: 'Live', details: 'Live pour discuter des dernières tendances.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’un projet récent.' },
          { day: 'Jeudi', type: 'Post', details: 'Infographie sur un sujet pertinent.' },
          { day: 'Dimanche', type: 'Post', details: 'Publication d’une citation inspirante.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Post', details: 'Article sur les tendances de l’industrie.' },
          { week: 2, type: 'Post', details: 'Vidéo d’un témoignage client.' },
          { week: 3, type: 'Post', details: 'Infographie sur un sujet pertinent.' },
          { week: 4, type: 'Live', details: 'Live pour discuter des dernières tendances.' }
        ]
      }
    ],
    'engagement': [
      {
        name: 'Plan Intensif',
        description: '1 post par jour',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Question ouverte pour susciter des discussions.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’une réussite professionnelle.' },
          { day: 'Mercredi', type: 'Post', details: 'Sondage sur un sujet d’actualité.' },
          { day: 'Jeudi', type: 'Post', details: 'Vidéo de retour d’expérience.' },
          { day: 'Vendredi', type: 'Live', details: 'Live pour répondre aux questions des abonnés.' },
          { day: 'Samedi', type: 'Post', details: 'Partage d’un défi pour les professionnels.' },
          { day: 'Dimanche', type: 'Post', details: 'Publication d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Modéré',
        description: '2-3 posts par semaine',
        content: [
          { day: 'Lundi', type: 'Post', details: 'Question ouverte pour susciter des discussions.' },
          { day: 'Mercredi', type: 'Post', details: 'Sondage sur un sujet d’actualité.' },
          { day: 'Vendredi', type: 'Live', details: 'Live pour répondre aux questions des abonnés.' },
          { day: 'Mardi', type: 'Post', details: 'Partage d’une réussite professionnelle.' },
          { day: 'Jeudi', type: 'Post', details: 'Vidéo de retour d’expérience.' },
          { day: 'Dimanche', type: 'Post', details: 'Publication d’un contenu généré par les utilisateurs.' }
        ]
      },
      {
        name: 'Plan Léger',
        description: '1 post par semaine',
        content: [
          { week: 1, type: 'Post', details: 'Question ouverte pour susciter des discussions.' },
          { week: 2, type: 'Post', details: 'Sondage sur un sujet d’actualité.' },
          { week: 3, type: 'Post', details: 'Vidéo de retour d’expérience.' },
          { week: 4, type: 'Live', details: 'Live pour répondre aux questions des abonnés.' }
        ]
      }
    ]
  }
};

const filterContentTypes = (content, excludedTypes) => {
  return content.filter(item => !excludedTypes.includes(item.type));
};

const proposeContentPlan = (platform, objective, excludedTypes = []) => {
  console.log(`Platform: ${platform}, Objective: ${objective}`);
  const plans = platforms[platform]?.[objective];
  console.log(`Plans found:`, plans);
  if (!plans) return null;

  return plans.map(plan => {
    const filteredContent = filterContentTypes(plan.content, excludedTypes);
    return {
      name: plan.name,
      description: plan.description,
      content: filteredContent
    };
  });
};

export { proposeContentPlan };