import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.2.3:0',
  releaseNotes: {
    en_US:
      'Free tier is more useful: open and close channels, change fees, rebalance a channel, Command Palette and Health score are now free. Auto Fee and Auto Rebalance now require Pro; Personal no longer includes them. Login lockout after 5 wrong passwords. Updates load without a hard refresh. [Full changelog](https://github.com/lioranecho-cpu/lightning-control-center/blob/v0.2.3/CHANGELOG.md).',
    es_ES:
      'El plan gratuito es más útil: abrir y cerrar canales, cambiar comisiones, reequilibrar un canal, la paleta de comandos y la puntuación de salud ahora son gratis. Auto Fee y Auto Rebalance ahora requieren Pro; Personal ya no los incluye. Bloqueo de inicio de sesión tras 5 contraseñas incorrectas. Las actualizaciones se cargan sin recargar a la fuerza. [Registro completo de cambios](https://github.com/lioranecho-cpu/lightning-control-center/blob/v0.2.3/CHANGELOG.md).',
    de_DE:
      'Die kostenlose Stufe kann mehr: Kanäle öffnen und schließen, Gebühren ändern, einen Kanal ausgleichen, Befehlspalette und Health-Score sind jetzt kostenlos. Auto Fee und Auto Rebalance erfordern jetzt Pro; Personal enthält sie nicht mehr. Anmeldesperre nach 5 falschen Passwörtern. Updates laden ohne erzwungenes Neuladen. [Vollständiges Änderungsprotokoll](https://github.com/lioranecho-cpu/lightning-control-center/blob/v0.2.3/CHANGELOG.md).',
    pl_PL:
      'Darmowy plan jest bardziej przydatny: otwieranie i zamykanie kanałów, zmiana opłat, równoważenie kanału, paleta poleceń i ocena kondycji są teraz darmowe. Auto Fee i Auto Rebalance wymagają teraz Pro; plan Personal już ich nie obejmuje. Blokada logowania po 5 błędnych hasłach. Aktualizacje ładują się bez wymuszonego odświeżania. [Pełny dziennik zmian](https://github.com/lioranecho-cpu/lightning-control-center/blob/v0.2.3/CHANGELOG.md).',
    fr_FR:
      "L'offre gratuite est plus utile : ouvrir et fermer des canaux, modifier les frais, rééquilibrer un canal, la palette de commandes et le score de santé sont désormais gratuits. Auto Fee et Auto Rebalance nécessitent désormais Pro ; Personal ne les inclut plus. Verrouillage de la connexion après 5 mots de passe erronés. Les mises à jour se chargent sans actualisation forcée. [Journal complet des modifications](https://github.com/lioranecho-cpu/lightning-control-center/blob/v0.2.3/CHANGELOG.md).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
