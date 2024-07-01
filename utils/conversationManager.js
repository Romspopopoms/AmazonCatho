import { proposeContentPlan } from './conversationPlanning';

export const handleUserInput = async (userId, userInput, step, platform, category, profile, excludedTypes = []) => {
  let response;
  let plans;
  let selectedPlan;
  let planDetails;

  // Logique pour gérer les différentes étapes de la conversation
  switch (step) {
    case 1:
      response = `Bonjour ${profile.name}! Sur quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
      break;
    case 2:
      response = `Quels sont vos objectifs principaux pour ce mois de contenu sur ${platform}? Voulez-vous augmenter la notoriété ou améliorer l'engagement ?`;
      break;
    case 3:
      response = `Pour atteindre votre objectif de ${userInput}, combien de posts souhaitez-vous par semaine ? Choisissez entre 'Intensif' (1 par jour), 'Modéré' (2-3 par semaine) ou 'Léger' (1 par semaine).`;
      break;
    case 4:
      const objective = userInput.toLowerCase();
      plans = proposeContentPlan(platform, category, excludedTypes);
      selectedPlan = plans.find(plan => plan.name.toLowerCase().includes(objective));
      
      response = `Vous avez choisi le ${selectedPlan.name}. Voici le détail du plan de contenu pour ${platform}:\n\n` +
                 selectedPlan.content.map(item => `- ${item.day || item.week}: ${item.type} - ${item.details}`).join('\n') +
                 `\n\nVoulez-vous générer les descriptions et les hashtags pour ces publications?`;
      break;
    case 5:
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
      break;
    default:
      response = "Merci pour votre participation! Votre planning de contenu est prêt à être utilisé.";
      break;
  }

  return response;
};
