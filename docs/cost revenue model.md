# Cost & Revenue Model: Holperfrei

*Idea-pitch version, November 2026. Every number here is a first estimate and will change once we run the pilot. 

## In one sentence

We put small AI cameras on garbage trucks that already drive every street. Every week the city gets a map of all potholes, ranked by urgency, and pays us a yearly subscription per km of road. It saves far more on repairs than it pays.

## Who pays whom

```
            €75 per km / year
   CITY  ─────────────────────────►  HOLPERFREI
    ▲                                  │    │
    │ saves repair money               │    │ €300 per truck / year
    │ + legal protection               │    ▼
    │                                  │  GARBAGE TRUCK COMPANY
    └──── weekly damage map ◄──────────┘   (+ free dashcam, bin-overflow alerts)

   Insurers / map apps / construction firms ── pay for data ──► HOLPERFREI  (from year 3)
   Grants (EXIST, mFUND) ─────────── pay for year 1 ─────────► HOLPERFREI
```

| Party | Role | What they pay | What they get |
|---|---|---|---|
| City road department | **Customer** | €75 per km per year | Weekly damage map, repair priority list, proof that roads were inspected |
| Garbage truck company | **Partner** | Nothing | €300 per truck per year, free dashcam, bin-overflow and illegal-dumping alerts, green PR |
| Insurers, map apps, construction firms | **Data buyers** (later) | Licence fee | Road-quality data |
| EXIST, mFUND, competitions | **Funders** (year 1) | Grants | A startup that solves a public problem |

## 1. How we make money (revenue model)

1. **Yearly subscription per km of road.** This is our main income.

   | Tier | What's included | €/km/yr | Expected mix |
   |---|---|---|---|
   | Essentials | Damage map, monthly report | 50 | 20% |
   | **Pro** | Live map, ranked repair list, work orders, liability log | **75** | 60% |
   | Enterprise | Pro + budget forecast, GIS/API, bike paths | 100 | 20% |
   | **Average** | | **75** | |

2. **Setup fee.** About €2,500 once per new customer, covering installation, map import and staff training.
3. **Paid pilot.** About €40k in year 1, from Dresden's Smart City or innovation budget or a grant.
4. **Data licensing**, from year 3. We sell the same data again to insurers, navigation apps and construction companies. It needs no extra cameras.

**Why €75 per km?**
- **The floor is our own cost** of about €24/km. €75 is roughly three times that, which leaves room for salaries and growth.
- **Cities already pay this kind of price.** vialytics, the market leader, charges about €100/km/yr. A classic survey vehicle costs €50–80/km for one snapshot. Dresden paid about €208/km for its 2026 survey.
- **The pitch line:** we are **25% cheaper than the market leader** and update weekly instead of once or twice a year.

**Why per km rather than per camera or per vehicle?** Cities plan budgets by road network and want to compare offers. Charging per km also means the city buys no hardware and avoids a large one-off purchase. For us it is recurring income.

**Example: Dresden.** 1,440 km × €75 = **€108k per year**.

## 2. What it costs us (cost model)

**Variable cost per km per year: €24.20**

One camera box covers about 50 km, because a garbage truck drives the same streets every week.

| Item | Calculation | €/km/yr |
|---|---|---|
| Camera box + installation | (€450 + €150) ÷ 3 years ÷ 50 km | 4.00 |
| Fee to garbage-truck company | €300 per truck ÷ 50 km | 6.00 |
| Mobile data (IoT SIM) | €5/month × 12 ÷ 50 km | 1.20 |
| Cloud + AI inference | estimate | 8.00 |
| Support & data checks | estimate | 5.00 |
| **Total** | | **24.20** |

That leaves **€75 − €24.20 = €50.80 per km**, a **68% gross margin**.

The camera box is a Raspberry Pi 5 (~€80), an AI HAT+ (~€70–100), a camera (~€40), a GPS/LTE modem (~€80), and a rugged case, mount and power supply (~€150).

**Fixed costs**
- **Team:** in year 1, three founders on the EXIST stipend (€2,500/month each). From year 2 we count about €70k per employee (salary plus employer costs). The team grows from 5 to 17 people.
- **Sales & marketing:** tenders, trade fairs, travel.
- **Admin, legal, insurance, GDPR:** cameras in public space need a solid data protection concept.
- **R&D:** model training, image labelling, test hardware.

**Privacy:** the AI runs on the device. Only images showing road damage are uploaded, and faces and number plates are blurred automatically.

## 3. Five-year plan (€)

| | 2027 | 2028 | 2029 | 2030 | 2031 |
|---|---|---|---|---|---|
| Large cities | – | 1 | 3 | 7 | 12 |
| Mid-sized towns | – | 5 | 20 | 45 | 80 |
| Landkreise | – | 1 | 5 | 10 | 15 |
| State road authority | – | – | – | – | 1 |
| **Paying customers** | pilot | **7** | **28** | **62** | **108** |
| Road km monitored | 300 | 2,750 | 10,100 | 22,650 | 40,900 |
| Camera boxes on trucks | 6 | 55 | 202 | 453 | 818 |
| Subscriptions | – | 206k | 758k | 1.70m | 3.01m |
| Setup fees | – | 18k | 53k | 85k | 115k |
| Pilot | 40k | – | – | – | – |
| Data licensing | – | – | 25k | 80k | 200k |
| **Revenue** | **40k** | **224k** | **835k** | **1.86m** | **3.32m** |
| Variable costs | 7k | 67k | 244k | 548k | 990k |
| **Gross profit** | 33k | 157k | 591k | 1.32m | 2.33m |
| Team (people) | 3 | 5 | 8 | 12 | 17 |
| Personnel | 90k | 350k | 560k | 840k | 1.19m |
| Sales & marketing | 10k | 40k | 100k | 180k | 280k |
| Admin, legal, GDPR | 15k | 40k | 70k | 110k | 150k |
| R&D | 20k | 30k | 50k | 70k | 90k |
| **Fixed costs** | **135k** | **460k** | **780k** | **1.20m** | **1.71m** |
| **Operating result (EBITDA)** | **−102k** | **−303k** | **−189k** | **+116k** | **+623k** |
| Funding | EXIST 125k | Seed 750k | | | |
| Cash at year end | 23k | 470k | 281k | 396k | 1.02m |

- **Break-even comes in 2030**, at about 60 customers.
- From 2028, over 90% of revenue is recurring.
- Cash never goes below zero, so the EXIST grant and a €750k seed round are enough.

**SaaS health check**
- **CAC** (cost to win one customer, including sales staff): about €11–18k.
- **LTV** (profit from one customer over 5 years): about €95–100k.
- **LTV ÷ CAC** is about **6–8×**. Above 3× counts as healthy.

## 4. How the city makes money (it saves it)

The city doesn't earn money from us. It **spends less**:

- **Cheaper repairs.** A small crack fixed early costs a fraction of rebuilding a broken road. Studies show preventive maintenance cuts spending by 10–30%.
- **No expensive one-off surveys.** Dresden paid **€380k for one survey** in 2026, and that snapshot is out of date after one winter. Holperfrei costs **€108k a year**, 28% of that survey, for weekly updates.
- **Fewer damage claims.** Under the *Verkehrssicherungspflicht*, cities must inspect roads and document it, or they pay when someone is injured. Our weekly map is that documentation.
- **Less staff time.** Engineers no longer drive around looking for potholes.

**Dresden business case (conservative):**

| | |
|---|---|
| What Dresden pays us | 1,440 km × €75 = **€108k/yr** |
| Maintenance budget, roads & bridges (2025) | €11.2m/yr |
| Saving from early repair (low end of 10–30%) | 10% |
| Share of that saving we take credit for | 50% |
| **Saving credited to Holperfrei** | 11.2m × 10% × 50% = **€560k/yr** |
| **Return on investment** | **≈ 5×** (every €1 saves ≈ €5) |
| Payback | ≈ 2–3 months |

## 5. How the garbage truck company makes money

They are a **partner, not a customer**:

- **€300 per truck per year** for doing nothing.
- **Zero effort.** The box is the size of a dashcam, runs on the truck's power, and we install and maintain it.
- **A free dashcam** for accidents and insurance disputes.
- **Bonus detection** of overflowing bins and illegal dumping, using the same camera with a different AI model.
- **Less wear on their own trucks** once bad roads are fixed.
- **Green PR**, which suits a city-owned company. Stadtreinigung Dresden belongs to the city, so one internal call from the road department opens the door.

**If they say no**, the box works just as well on buses (DVB, also city-owned), delivery vans, taxis or the city's own service cars.

## 6. Funding: how we survive until cities pay

Revenue and funding are different things. Funding is the bridge until revenue covers our costs. **We start without investors**:

| Stage | Source | What we get |
|---|---|---|
| Now | **dresden\|exists** (TU Dresden startup service) | Free coaching, pitch training, help with grant applications |
| Now | **Startup competitions** (e.g. futureSAX) | Prize money and contacts |
| Year 1 | **EXIST-Gründungsstipendium** | €2,500/month per founder for 12 months, plus up to €30k material and €5k coaching. A grant, not a loan, and we keep 100% of the company |
| Year 1 | **mFUND** (Federal Ministry of Transport) | Funding for data-driven mobility projects, which fits the pilot |
| Year 1 | **Paid pilot** from Dresden's Smart City or innovation budget | Our first revenue |
| Year 2 | **Seed round** (business angels, TGFS Saxony) | €750k, raised once the pilot shows it works, so we give away less of the company |
| Later | Revenue covers costs, EU programs (EIC Accelerator) | Growth |

## 7. How we win the first customer

The first customer is the hardest. We don't sell to Dresden on day one. We make saying yes risk-free:

1. **Show before asking.** Put a camera on our own car or bike, drive one Dresden district for two weeks, and show the city a map of *their* potholes.
2. **Free pilot.** About 300 km for six months, paid by grants, so the city needs no budget and no tender.
3. **Solve their legal duty.** Automatic proof of inspection under the Verkehrssicherungspflicht.
4. **Be local.** We are TU Dresden students, the city already runs a Smart City project with TU Dresden, and the garbage company is city-owned.
5. **Help their project, don't compete with it.** Dresden is building free open-source road software. We become the weekly data feed for that tool, which makes the project lead our champion.
6. **Convert.** At the end of the pilot, Dresden moves to the paid subscription.
7. **Use the reference.** Leipzig, Chemnitz and smaller towns trust a solution Dresden already uses.

**If Dresden is too slow**, we start with:
- a small nearby town such as Radebeul, Pirna or Freital, where the mayor and one engineer decide;
- a private road owner such as an industrial park, logistics yard or housing company;
- a construction company that needs before-and-after road records.

## 8. Competitors

| | Data source | How often | Price | Extra staff/vehicles | Our angle |
|---|---|---|---|---|---|
| **Holperfrei** | Camera + edge AI on garbage trucks | **Weekly, every street** | **€75/km/yr** | **None** | – |
| vialytics (Stuttgart, >600 municipalities) | Smartphone in city cars | When staff drive (e.g. 2×/yr) | ≈ €100/km/yr | City staff drive | 25% cheaper, weekly, no staff time |
| Survey vehicles (Lehmann + Partner, eagle eye, TÜV Rheinland Schniering) | Laser + camera vehicle | One snapshot every few years | €50–80/km per survey; Dresden 2026 ≈ €208/km | Contractor vehicle | Fraction of the cost, always current |
| Cyface (TU Dresden spin-off) | Citizens' smartphone app | Only where volunteers ride | Not public | None, needs volunteers | Full, systematic coverage |
| Vaisala RoadAI (Finland) | Smartphone in city cars | When staff drive | Not public | City staff drive | Local, GDPR-first, German market |
| RoadBotics (USA, Michelin since 2022) | Smartphone video | Per survey | Not public | City staff drive | US-focused, not active in Germany |
| Dresden Smart City project (€1.3m funded) | 5 asphalt sensors + 1 survey | Snapshot + 5 points | Public project, software to be open source | Contractor vehicle | We complement it as the weekly data feed |

## 9. Market size

| | Road km | €/yr at €75/km |
|---|---|---|
| **TAM:** all municipal roads in Germany | 714,000 | €54m |
| **SAM:** the ≈ ⅓ with major damage | 235,600 | €18m |
| **Beachhead:** Saxony (418 municipalities) | 36,678 | €2.8m |
| **SOM:** our plan in 2031 | 40,900 | €3.1m |

Not counted here: data licensing, bike paths, other countries.

## 10. Why it scales

- The cameras ride on vehicles that already drive every street, so we need no fleet of our own.
- A new city costs only a few hundred euros of hardware per 50 km.
- The software and AI are built once and sold many times.
- The same data is sold twice, to cities and to data buyers.

## What is real and what is estimated

- **Real data:** Dresden's road km, the €380k survey, the €11.2m budget, vialytics' price, survey-vehicle costs, German and Saxon road km, the 10–30% saving from early maintenance, EXIST amounts, hardware prices.
- **Our estimates:** customer growth, team size, tier mix, cloud and support cost, km per camera, truck fee, data licensing income. These go up or down once the pilot gives us real numbers. See [`tentative-numbers.md`](tentative-numbers.md).

## Sources

**Dresden**
- Straßen- und Tiefbauamt, ~1,440 km of roads and ~430 km of bike paths: https://www.dresden.de/de/rathaus/aemter-und-einrichtungen/oe/dborg/stadt_dresden_6734.php
- 2026 road condition survey, 1,830 km for ≈ €380k: https://www.dresden.de/de/rathaus/aktuelles/pressemitteilungen/2026/06/pm_065.php
- Road and bridge maintenance budget 2025, ≈ €11.2m: https://www.dresden.de/de/rathaus/aktuelles/pressemitteilungen/04/pm_034.php
- Dresden road network statistics: https://www.dresden.de/media/pdf/statistik/Statistik_3501_Verkehrsnetze.pdf
- Dresden Smart City road sensors, €1.3m, open-source software (Volksstimme): https://www.volksstimme.de/panorama/mit-sensoren-gegen-risse-dresden-setzt-auf-smarte-strassen-4285957
- Dresden Smart City road sensors (Sachsen Fernsehen): https://www.sachsen-fernsehen.de/amp/sensoren-sollen-dresdens-strassen-schuetzen-2253330/

**Roads in Germany and Saxony**
- 714,000 km of municipal roads, about a third with major damage (Difu Impulse 7/2023): https://kommunal.de/sites/default/files/2023-09/Difu%20Impulse%207-2023_Investitionsbedarfe%20Verkehrsinfrastruktur.pdf
- Saxony road network, 36,678 km: https://publikationen.sachsen.de/bdb/artikel/15223/documents/18366
- 418 municipalities in Saxony: https://www.statistik.sachsen.de/download/presse-2023/mi_statistik-sachsen-048-2023_gemeindeverzeichnis-2023.pdf
- Pothole repair costs up to €200, ADAC warning on road damage: https://transport-online.de/news/strassenverkehr-adac-warnt-vor-massiven-strassenschaeden-und-schlagloechern-187189.html
- Preventive maintenance cuts spending 10–30% (Rutgers): https://www.sciencedaily.com/releases/2019/01/190115124451.htm
- Classic survey vehicle costs €50–80/km (BASt report V298): https://opus4.hbz-nrw.de/opus45-bast/files/1830/V298_Anhang.pdf

**Competitors**
- vialytics ≈ €100/km/yr: https://www.investmentweek.com/wie-vialytics-die-strasseninstandhaltung-digitalisiert/
- vialytics in Göppingen, ≈ €25k/yr for 260 km: https://filstalexpress.de/lokalnachrichten/213224/digitalisierung-stadt-goeppingen-setzt-auf-vialytics-bei-der-strassenzustandskontrolle/
- vialytics, >600 municipalities, >$18m raised: https://www.it-boltwise.de/vialytics-ki-gestuetzte-strassenerhaltung-revolutioniert-kommunale-infrastruktur.html
- Cyface: https://land-der-ideen.de/en/project/cyface-more-convenient-driving-3313
- Vaisala RoadAI: https://www.vaisala.com/products/road-asset-management
- Michelin acquires RoadBotics (2022): https://technical.ly/startups/roadbotics-acquired-by-michelin
- eagle eye survey vehicle (Bergkamen): https://bergkamen-infoblog.de/stadt-bergkamen-laesst-jetzt-die-oeffentlichen-strassen-wege-und-plaetze-erfassen-und-bewerten/

**Funding**
- EXIST-Gründungsstipendium: https://www.ptj.de/foerdermoeglichkeiten/exist/gruendungsstipendium
- EXIST one-pager (BMWE): https://exist.de/wp-content/uploads/2025/11/BMWE_Onepager_EXIST-Gruendungsstipendium_2025-DE_web-bf.pdf
- mFUND: https://www.bmv.de/SharedDocs/DE/Artikel/mFUND/mfund-foerderung-mobilitaet-4-0.html
- dresden|exists: https://tu-dresden.de/tu-dresden/newsportal/news/startup-service-dresden-exists-feiert-25-jaehriges-jubilaeum

