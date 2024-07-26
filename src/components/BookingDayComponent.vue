<template>
  <div class="day-picker">
    <div class="day-picker__navigation">
      <div class="day-picker__tabs">
        <button
          @click="currentTab = 'Prenota'"
          :class="['day-picker__tab', { 'day-picker__tab--active': currentTab === 'Prenota' }]"
        >
          Form prenotazione
        </button>
        <button
          @click="currentTab = 'Prenotazioni'"
          :class="['day-picker__tab', { 'day-picker__tab--active': currentTab === 'Prenotazioni' }]"
        >
          Attuali prenotazioni
        </button>
      </div>
    </div>
    <div class="day-picker__wrapper">
      <div v-if="currentTab === 'Prenota'">
        <BookingDayFormComponent
          :selectedDay="selectedDay"
          :events="events"
          :startHour="startHour"
          :endHour="endHour"
          :minBookingTime="minBookingTime"
        />
      </div>
      <div v-if="currentTab === 'Prenotazioni'">
        <BookingDayTableComponent
          :selectedDay="selectedDay"
          :events="events"
          :startHour="startHour"
          :endHour="endHour"
          :minBookingTime="minBookingTime"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BookingDayTableComponent from './BookingDayTableComponent.vue'
import BookingDayFormComponent from './BookingDayFormComponent.vue'

export default {
  name: 'BookingDayComponent',
  components: {
    BookingDayTableComponent,
    BookingDayFormComponent
  },
  props: {
    selectedDay: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentTab: 'Prenota',
      events: [
        { user: 'Mario Rossi', start: '9:00', end: '12:00', field: 1, date: '2024-07-26' },
        { user: 'Lucia Rosaire', start: '13:00', end: '15:00', field: 2, date: '2024-07-26' },
        { user: 'Martina Giorla', start: '15:00', end: '16:30', field: 2, date: '2024-07-26' },
        { user: 'Jacopo de Gattis', start: '16:45', end: '18:00', field: 2, date: '2024-07-27' },
        { user: 'Luigi Scarciglia', start: '20:45', end: '23:00', field: 3, date: '2024-07-27' }
      ],
      startHour: 9,
      endHour: 23,
      minBookingTime: 30
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/functions.scss';
.day-picker {
  box-sizing: border-box;
  padding-top: responsive-size(3, 1.5);
  padding-bottom: responsive-size(3, 1.5);
  padding-left: responsive-size(3, 1);
  padding-right: responsive-size(3, 1);
  width: 100%;
  overflow-y: scroll;
  min-height: 100%;

  &__navigation {
    margin-bottom: 2rem;
  }

  &__tabs {
    display: flex;
    justify-content: space-between;
  }

  &__tab {
    background-color: white;
    color: #8f9ca7;
    border-radius: 0px;
    border: 1px solid #e3eaf3;
    min-width: 150px;
    height: 3.8rem;

    &:hover {
      cursor: pointer;
    }
  }

  &__tab--active {
    background-color: var(--twelfth-color, #f0f0f0); /* Fallback color */
    color: var(--primary-color, #000); /* Fallback color */
  }

  &__wrapper {
    width: 100%;
  }
}
</style>
