import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.2:0',
  releaseNotes: {
    en_US: 'LCC v0.2.2: Loop In to refill channels, Inbound Health card, channels with the same peer managed together, safer rebalancing (never pays more than half of what the channel earns), recycle advice on the Strategy page, and a cleaner Node Journal.',
    es_ES: 'LCC v0.2.2: Loop In para recargar canales, tarjeta de salud de entrada, canales con el mismo par gestionados juntos, reequilibrio más seguro (nunca paga más de la mitad de lo que gana el canal), consejos de reciclaje en la página de estrategia y un diario del nodo más claro.',
    de_DE: 'LCC v0.2.2: Loop In zum Auffüllen von Kanälen, Karte zur eingehenden Erreichbarkeit, Kanäle mit demselben Peer gemeinsam verwalten, sichereres Rebalancing (zahlt nie mehr als die Hälfte dessen, was der Kanal verdient), Recycling-Hinweise auf der Strategieseite und ein übersichtlicheres Node-Journal.',
    pl_PL: 'LCC v0.2.2: Loop In do uzupełniania kanałów, karta stanu płynności przychodzącej, kanały z tym samym węzłem zarządzane razem, bezpieczniejsze równoważenie (nigdy nie płaci więcej niż połowę tego, co zarabia kanał), porady recyklingu na stronie strategii i czytelniejszy dziennik węzła.',
    fr_FR: 'LCC v0.2.2 : Loop In pour recharger les canaux, carte de santé entrante, canaux avec le même pair gérés ensemble, rééquilibrage plus sûr (ne paie jamais plus de la moitié de ce que le canal rapporte), conseils de recyclage sur la page Stratégie et un journal du nœud plus clair.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
