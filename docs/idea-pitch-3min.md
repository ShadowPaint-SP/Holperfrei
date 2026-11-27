# Idea Pitch: Holperfrei, 3-minute NABC pitch

*Fri 27 Nov 2026, 14:50. Deck: [`site/pitch.html`](../site/pitch.html) (press **N** for speaker notes, arrow keys to move). About 400 spoken words. The two pauses marked below are the lines people should remember.*

## Timing

| Part | NABC | Time | Running |
|---|---|---|---|
| Hook | Hook | 12 s | 0:12 |
| Name | Hook | 5 s | 0:17 |
| The problem, why early matters | Need | 33 s | 0:50 |
| The idea | Approach | 25 s | 1:15 |
| The product (fix list) | Approach | 20 s | 1:35 |
| Business model | Approach | 15 s | 1:50 |
| Pilot | Approach | 15 s | 2:05 |
| What the city gains | Benefit | 23 s | 2:28 |
| Competition | Competition | 20 s | 2:48 |
| Close | Close | 12 s | 3:00 |

If you're over 3:10 in practice, shorten the product part first. Keep the business model and the pilot.

## The pitch

**Hook (0:00–0:12)**
You're on the bus with your morning coffee. The bus hits a pothole, and the coffee is all over your shirt.
So here's a question: when did the city last look at your street?

**Name (0:12–0:17)**
We're Holperfrei, computer science students from TU Dresden. *[pause]*
**We find potholes before you do.**

**Need (0:17–0:50)**
This year Dresden paid €380,000 for one picture of its 1,440 kilometres of roads. The ones before that were in 2015 and 2021. So for five or six years at a time, the city is driving blind. It hears about a pothole when someone complains, or crashes.
And timing is everything. A small crack is sealed in minutes. But water gets in, frost breaks it open, and it becomes a pothole: up to €200 a hole, and the city is liable. Today the city only notices once the cheap repair window has closed.

**Approach: the idea (0:50–1:15)**
Garbage trucks already drive every street, every week. *[pause]*
**The trucks are already there. We just give them eyes.**
Three small cameras, mounted low, front and both sides. The driver does nothing. AI on board finds cracks and potholes, and blurs faces and number plates before anything leaves the truck.

**Approach: the product (1:15–1:35)**
Every Monday the city gets a ranked fix list: photo, street, urgency, and how it changed since last week. This crack became a hole: fix now. A planner sends one crew to a whole cluster, and the next pass shows whether the repair held.

**Approach: business model (1:35–1:50)**
How we make money: a subscription. The city pays €75 per kilometre per year, cameras included, so it buys no hardware. The waste company is our partner: we pay it per truck, and it gets a free dashcam.

**Approach: pilot (1:50–2:05)**
We start small: three months, one district, a few trucks. A low-risk first step for the city, not a big purchase. Inspectors check the same streets by hand, so we measure how accurate we are. Then the city decides: subscribe, or stop.

**Benefit (2:05–2:28)**
That's about 300 times more checks than today, with no inspectors driving around. All of Dresden costs €108,000 a year, less than a third of one survey. And since early repair saves 10 to 30% of maintenance costs, it pays for itself several times over.

**Competition (2:28–2:48)**
The market leader, vialytics, puts smartphones in city cars, so someone has to drive. Our trucks drive anyway: every street, every week, 25% cheaper. And Dresden is building its own free road software. It needs data, and we want to be its weekly feed, not its competitor.

**Close (2:48–3:00)**
So let Dresden see its roads every week, before the next complaint, not after.
Because whether you drive or take the bus, your next coffee stays in the cup.
We're Holperfrei. Thank you.

## Numbers to know by heart

| | |
|---|---|
| Dresden road network | 1,440 km |
| 2026 road survey | €380,000 for one snapshot (earlier ones: 2015, 2021) |
| Checks | Weekly vs every 5–6 years ≈ 300× more |
| Price | €75 per km per year, cameras included |
| Dresden per year | 1,440 × €75 = €108,000 |
| Maintenance budget | €11.2m per year (roads and bridges, 2025) |
| Early repair saves | 10–30% (Rutgers study) |
| Saving | At least €150k/yr (NABC card, cautious); €560k/yr if early repair saves 10% and we take credit for half (deck) |
| Break-even for the city | Earlier repairs must save just 1% of the budget |
| Pothole repair | Up to €200 each (ADAC) |
| Our cost | ≈ €27 per km (three cameras, one computer per truck) → 65% gross margin |
| Partner fee | €300 per truck per year |
| One truck covers | ≈ 50 km |
| vialytics | 600+ municipalities, ≈ €100 per km per year |
| Funding | EXIST grant 2027, €750k seed 2028 |
| Revenue | €40k (2027 pilot) → €224k → €835k → €1.86m → €3.32m (2031) |
| Customers | 7 (2028) → 28 → 62 → 108 (2031) |
| Break-even | 2030, ≈ 60 customers |
| Market | Germany 714,000 km of municipal roads ≈ €54m/yr; Saxony ≈ €2.8m/yr |

## Likely questions and short answers

- **"How accurate is the AI?"** We don't claim a number yet. The pilot measures it: inspectors check the same streets by hand, and we count hits, misses and false alarms. The open-source model we start with misses unusual damage, which is why we train on Dresden's own images.
- **"Privacy / GDPR?"** The AI runs on the truck. Faces and number plates are blurred before anything leaves it. Only images showing damage are uploaded.
- **"Why would the waste company agree?"** Stadtreinigung Dresden is city-owned. It gets €300 per truck, a free dashcam and bin-overflow alerts, and does nothing extra. If it says no, the same kit fits buses or delivery vans.
- **"Do garbage trucks really drive every road?"** Every residential street at least every other week, but not every main road. The pilot measures coverage from the GPS trace; buses or city cars can fill gaps.
- **"Why not just use vialytics?"** Someone has to drive for vialytics. Our trucks drive anyway, so we get every street weekly, at 25% less.
- **"Dresden builds free software. Why pay you?"** Software without fresh data is useless. We deliver the weekly data and plug into their tool.
- **"Who pays for the pilot?"** Options we're looking at: the city's Smart City or innovation budget, or a joint mFUND application with the city. A small fixed-price pilot keeps the decision small.
- **"Cities are slow buyers."** That's why we start with a small, low-risk pilot, and why smaller towns nearby, where the mayor and one engineer decide, are our next customers.
- **"When do you make money?"** First subscriptions in 2028 after the pilot, break-even in 2030 at about 60 customers.
- **"Did you talk to customers?"** Answer with the interview results, honestly.
