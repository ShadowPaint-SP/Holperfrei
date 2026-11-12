# Tentative numbers: Holperfrei

*These are the inputs behind the cost & revenue model. **Real** means the number comes from a source; **Estimate** means it's our guess and can go up or down. 


## Market anchors (real numbers)

| Input | Value | Unit | Real / Estimate | Source or reasoning |
|---|---|---|---|---|
| Dresden road network managed by Straßen- und Tiefbauamt | 1,440 | km | Real | dresden.de – Straßen- und Tiefbauamt: responsible for ~1,440 km of roads (plus ~430 km bike paths) |
| Dresden bike-path network | 430 | km | Real | dresden.de – Straßen- und Tiefbauamt (~430 km) |
| Dresden 2026 one-off condition survey (special vehicle) – cost | 380,000 | € | Real | dresden.de press release 2026/06: measurement of 1,830 km incl. evaluation ≈ €380,000 (Lehmann + Partner) |
| …km covered by that survey | 1,830 | km | Real | Same press release |
| → cost per km for ONE snapshot | 207.65 | €/km | Calculated | Formula. A single snapshot, outdated as soon as winter hits. |
| Dresden maintenance budget roads & bridges (2025) | 11,200,000 | €/yr | Real | dresden.de press release: Unterhaltung Straßen und Brücken 2025 ≈ €11.2m |
| Competitor price: vialytics | 100 | €/km/yr | Real | Press (investmentweek.com, kommunalnet, treffpunkt-kommune): ~€100 per km per year; Göppingen pays ~€25k/yr for 260 km |
| Classic ZEB measuring-vehicle survey | 80 | €/km per survey | Real | BASt report V298: €50 (motorway) – €80 (Kreisstraßen) per km, per one-off survey |
| Municipal roads in Germany | 714,000 | km | Real | Difu Impulse 7/2023: ~714,000 km of municipal roads |
| Total road network Saxony | 36,678 | km | Real | sachsen.de study on municipal roads: 36,678 km total network |
| Municipalities in Saxony | 418 | count | Real | Statistisches Landesamt Sachsen 2023: 418 Gemeinden |
| Cost to patch one pothole | 200 | € | Real | ADAC via transport-online.de: up to €200 per pothole |
| Saving from preventive (early) maintenance | 10% | % of spend | Real | Rutgers study (ScienceDaily 2019): agencies cut spending 10–30%. We use the LOW end (10%). |
| Share of that saving credited to Holperfrei | 50% | % | Estimate | Conservative: data alone doesn't fix roads; city process changes do the rest |
| Share of municipal roads with major damage | 33% | % | Real | Difu 2023 via ADAC/transport-online.de: about one third of municipal roads show larger damage |

## Pricing (€ per km of road per year)

| Input | Value | Unit | Real / Estimate | Source or reasoning |
|---|---|---|---|---|
| Essentials – damage map + monthly report | 50 | €/km/yr | Estimate | Half of vialytics – entry tier for small towns |
| Pro – live map, ranked repair list, work orders, liability log | 75 | €/km/yr | Estimate | Anchor price: 25% below vialytics (~€100) – and weekly instead of 1–2x/year updates |
| Enterprise – + budget forecast, GIS/API, bike paths | 100 | €/km/yr | Estimate | Same price as vialytics, but far more frequent data |
| Customer mix: Essentials | 20% | % | Estimate | Assumption |
| Customer mix: Pro | 60% | % | Estimate | Assumption – most buyers pick the middle tier |
| Customer mix: Enterprise | 20% | % | Calculated | Formula (rest) |
| → Blended price | 75 | €/km/yr | Calculated | Formula |
| One-time setup / onboarding fee per new customer | 2,500 | € | Estimate | Assumption: hardware install, GIS import, staff training |
| Volume discount for state road authority (LASuV) | 40% | % | Estimate | Assumption: large networks negotiate |
| Annual churn | 5% | % | Estimate | vialytics reports ~95% contract renewal → ~5% churn |
| Max. customer lifetime counted in LTV | 5 | years | Estimate | Conservative cap (typical public contract term 3–5 yrs), even though churn implies longer |

## Average network size per customer segment

| Input | Value | Unit | Real / Estimate | Source or reasoning |
|---|---|---|---|---|
| Large city (kreisfreie Stadt, e.g. Dresden, Leipzig, Chemnitz) | 1,200 | km | Estimate | Dresden 1,440 km; we use 1,200 to stay conservative |
| Mid-sized town (20k–100k inhabitants) | 250 | km | Estimate | Göppingen (≈58k inh.) has 260 km |
| Landkreis (Kreisstraßen) | 300 | km | Estimate | Example from press: a Landkreis with ~280 km Kreisstraßen |
| State road authority contract (part of LASuV network) | 2,000 | km | Estimate | Saxony has ~4,500 km Staatsstraßen; first contract assumed for a part |

## Cost per device (camera box on a garbage truck / bus)

| Input | Value | Unit | Real / Estimate | Source or reasoning |
|---|---|---|---|---|
| Hardware per device | 450 | € | Estimate | Raspberry Pi 5 (~€80) + AI HAT+ (€70–100, retail) + camera (~€40) + GPS/LTE modem (~€80) + rugged enclosure, mount, power (~€150) |
| Installation per device | 150 | € | Estimate | Assumption: ~2h technician incl. travel |
| Device lifetime | 3 | years | Estimate | Assumption (vibration, weather) |
| Road km covered per device | 50 | km | Real | Assumption: garbage trucks drive every residential street at least bi-weekly; 1 device per 50 km network |
| Payment to fleet partner per vehicle | 300 | €/yr | Estimate | Assumption: compensation for power + mounting (waste company / DVB) |
| Mobile data per device | 5 | €/month | Estimate | IoT SIM plan; edge AI uploads only damage frames, not video |
| Cloud storage + AI inference | 8 | €/km/yr | Estimate | Assumption |
| Customer support & data QA | 5 | €/km/yr | Estimate | Assumption |
| → Variable cost per km per year | 24.20 | €/km/yr | Calculated | Formula: hardware depreciation + partner + data + cloud + support |

## Team & overhead

| Input | Value | Unit | Real / Estimate | Source or reasoning |
|---|---|---|---|---|
| Fully loaded cost per employee (from year 2) | 70,000 | €/yr | Estimate | Assumption: ~€58k gross dev salary + ~20% employer social contributions |
| EXIST stipend per founder (graduate) | 2,500 | €/month | Real | ptj.de: €2,500/month for graduates, 12 months |
| Share of team working in sales | 25% | % | Estimate | Assumption – counted in CAC |
| EXIST material + coaching budget (team) | 35,000 | € | Real | ptj.de: up to €30,000 material for teams + €5,000 coaching |

## Five-year plan inputs (all estimates)

| | 2027 | 2028 | 2029 | 2030 | 2031 |
|---|---|---|---|---|---|
| Large cities | 0 | 1 | 3 | 7 | 12 |
| Mid-sized towns | 0 | 5 | 20 | 45 | 80 |
| Landkreise | 0 | 1 | 5 | 10 | 15 |
| State road authority | 0 | 0 | 0 | 0 | 1 |
| Pilot km (grant-funded) | 300 | 0 | 0 | 0 | 0 |
| Paid pilot (€) | 40,000 | 0 | 0 | 0 | 0 |
| Data licensing (€) | 0 | 0 | 25,000 | 80,000 | 200,000 |
| Team (people) | 3 | 5 | 8 | 12 | 17 |
| Sales & marketing (€) | 10,000 | 40,000 | 100,000 | 180,000 | 280,000 |
| Admin, legal, GDPR (€) | 15,000 | 40,000 | 70,000 | 110,000 | 150,000 |
| R&D (€) | 20,000 | 30,000 | 50,000 | 70,000 | 90,000 |
| Seed round (€) | 0 | 750,000 | 0 | 0 | 0 |

## Biggest levers

If the professor pushes back, these move the result most:

- **Customer growth**: how many cities sign each year.
- **Price per km**: €75 now; every €10 changes 2031 revenue by about €400k.
- **Km per camera**: 50 km assumed; fewer km per camera means more hardware.
- **Team size**: the largest cost by far.