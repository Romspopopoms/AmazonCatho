import { proposeContentPlan } from './conversationPlanning';

const objectiveKeywords = {
  'notoriété': 'notoriety',
  'engagement': 'engagement'
};

export const handleUserInput = async (userId, userInput, step, platform, category, profile, excludedTypes = []) => {
  let response;
  let plans;
  let selectedPlan;
  let planDetails;

  // Convertir l'entrée utilisateur en minuscules pour une comparaison insensible à la casse
  const userInputLower = userInput.toLowerCase();

  // Logique pour gérer les différentes étapes de la conversation
  switch (step) {
    case 1:
      response = `Bonjour ${profile.name}! Sur quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
      break;
    case 2:
      response = `Quels sont vos objectifs principaux pour ce mois de contenu sur ${platform}? Voulez-vous augmenter la notoriété ou améliorer l'engagement ?`;
      break;
    case 3:
      const objective = objectiveKeywords[userInputLower];
      if (!objective) {
        response = "Je n'ai pas compris votre objectif. Veuillez choisir entre 'notoriété' et 'engagement'.";
        break;
      }
      response = `Pour atteindre votre objectif de ${userInput}, combien de posts souhaitez-vous par semaine ? Choisissez entre 'Intensif' (1 par jour), 'Modéré' (2-3 par semaine) ou 'Léger' (1 par semaine).`;
      break;
    case 4:
      const frequency = userInputLower;
      plans = proposeContentPlan(platform, objective, excludedTypes);
      if (!plans || plans.length === 0) {
        response = `Désolé, je n'ai pas trouvé de plans pour la plateforme ${platform} avec l'objectif ${category}. Pouvez-vous choisir une autre option ?`;
      } else {
        selectedPlan = plans.find(plan => plan.name.toLowerCase().includes(frequency));
        if (!selectedPlan) {
          response = `Désolé, je n'ai pas trouvé de plan correspondant à votre fréquence. Pouvez-vous choisir une autre option ?`;
        } else {
          response = `Vous avez choisi le ${selectedPlan.name}. Voici le détail du plan de contenu pour ${platform}:\n\n` +
                     selectedPlan.content.map(item => `- ${item.day || item.week}: ${item.type} - ${item.details}`).join('\n') +
                     `\n\nVoulez-vous générer les descriptions et les hashtags pour ces publications?`;
        }
      }
      break;
    case 5:
      if (!selectedPlan) {
        response = "Je n'ai pas trouvé de plan de contenu valide. Veuillez recommencer.";
      } else {
        planDetails = selectedPlan.content.map(item => {
          return {
            ...item,
            description: `Nous avons adapté ce contenu pour correspondre à vos préférences: ${item.details}.`,
            hashtags: [`#${platform}`, `#${category}`, `#${item.type}`, '#YourBrand'].join(', '),
            prompt: `Generate content for a ${item.type} focusing on ${item.details} for ${platform}.`
          };
        });

        response = `Voici les descriptions et les hashtags pour chaque publication:\n\n` +
                   planDetails.map(item => `${item.day || item.week}:\n` +
                                           `Type: ${item.type}\n` +
                                           `Description: ${item.description}\n` +
                                           `Hashtags: ${item.hashtags}\n` +
                                           `Prompt: ${item.prompt}\n`).join('\n');
      }
      break;
    default:
      response = "Merci pour votre participation! Votre planning de contenu est prêt à être utilisé.";
      break;
  }

  return response;
};
