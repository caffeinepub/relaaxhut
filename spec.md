# RelaaxHut

## Current State

The `ServicesSection.tsx` has a `RentalCard` component with a simple 2-step booking form:
- Step 1: Location (Delhi/Bangalore), pickup date, return date
- Step 2: Name, phone, email → mailto: link pre-filled to relaaxhut@gmail.com

No cost calculation, no driver option, no DL checklist, no confirmation screen.

## Requested Changes (Diff)

### Add
- Night-by-night cost breakdown: ₹9,000 for weekdays (Mon–Fri), ₹11,000 for weekends (Sat–Sun)
- Running total shown after date selection
- Step: driver preference — "With Driver" (+₹1,500/night) or "Without Driver"
- Food allowance informational note shown when driver is selected (no cost, just user awareness)
- Updated total shown after driver selection
- Additional customer fields: pickup location (text), drop location (text), DL (Driving Licence) availability — yes/no checklist
- Step 4: Booking Confirmed screen showing a formatted booking summary (all details, dates, cost breakdown, add-ons)
- "Send Booking to RelaaxHut" button on confirmation screen: opens mailto:relaaxhut@gmail.com with full booking summary pre-filled

### Modify
- Expand `RentalCard` from 2 steps to 4 steps:
  1. Date selection + cost breakdown
  2. Driver preference + food allowance info + updated total
  3. Customer details (name, mobile, email, pickup location, drop location, DL checklist)
  4. Booking confirmed screen + mailto button
- Location (Delhi/Bangalore) stays in Step 1

### Remove
- Old 2-step flow in `RentalCard`
- The old simple mailto trigger on step 2 form submit (now moved to confirmation step 4)

## Implementation Plan

1. **Cost calculation helper**: Given pickup and return dates, iterate each night and classify as weekday (₹9,000) or weekend (₹11,000). Return a per-night array and total.
2. **Step 1 UI**: Location select + date pickers. On proceed, show per-night breakdown table (date, day of week, price) and a total. "Proceed" button advances to step 2.
3. **Step 2 UI**: Show cost summary recap. Two radio options — "Without Driver" / "With Driver (+₹1,500/night)". If driver selected, show info box: "Driver food allowances are the traveller's responsibility during the trip." Show updated grand total. Back button returns to step 1.
4. **Step 3 UI**: Show brief booking recap at top. Fields: Full Name (text), Mobile (tel), Email (email), Pickup Location (text), Drop Location (text), DL Available (checkbox — "I have a valid driving licence"). All fields required except DL (it's a checklist/informational). Back button returns to step 2.
5. **Step 4 UI**: Formatted confirmation card — "Booking Confirmed!" heading, full summary (vehicle: RelaaxHut BH Caravan, location, dates, nights, per-night breakdown, driver add-on, grand total, customer name, mobile, email, pickup/drop locations, DL status). "Send Booking to RelaaxHut" button generates mailto:relaaxhut@gmail.com with subject and body pre-filled from all booking data. "Make Another Booking" resets the form.
6. Validate inputs at each step before advancing; use `toast.error` for validation messages.
