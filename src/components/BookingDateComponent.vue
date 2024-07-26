<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'BookingDateComponent',
  components: {
    FontAwesomeIcon
  },
  props: {
    selectedDay: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    const today = new Date()
    const weekday = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'][
      today.getDay()
    ]

    return {
      daysOfWeek: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
      startTime: '09:00',
      endTime: '23:00',
      intervalMinutes: 30,
      totalIntervals: null,
      currentMonth: today.getMonth(), // Index of the current month (0-11)
      currentYear: today.getFullYear(),
      internalSelectedDay: {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        weekday: weekday
      }
    }
  },
  watch: {
    selectedDay: {
      handler(newVal) {
        if (newVal) {
          const date = new Date(newVal.year, newVal.month, newVal.day)
          const weekday = this.daysOfWeek[(date.getDay() + 6) % 7] // Adjusting for Monday start
          this.internalSelectedDay = { ...newVal, weekday }
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    abbreviatedDays() {
      return this.daysOfWeek.map((day) => day.substring(0, 3))
    },
    monthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('it-IT', {
        month: 'long'
      })
    },
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },
    firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay()
    },
    currentDate() {
      const today = new Date()
      if (today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear) {
        return today.getDate()
      }
      return null
    },
    today() {
      return new Date()
    }
  },
  methods: {
    isPastDay(day) {
      const date = new Date(this.currentYear, this.currentMonth, day)
      return date < this.today.setHours(0, 0, 0, 0)
    },
    handleDayClick(day) {
      if (!this.isPastDay(day)) {
        const date = new Date(this.currentYear, this.currentMonth, day)
        this.internalSelectedDay = {
          day,
          month: this.currentMonth,
          year: this.currentYear,
          weekday: this.daysOfWeek[(date.getDay() + 6) % 7] // Adjusting for Monday start
        }
        this.$emit('day-selected', this.internalSelectedDay) // Emissione evento con il giorno selezionato
      }
    },
    calculateIntervals() {
      const start = this.parseTime(this.startTime)
      const end = this.parseTime(this.endTime)
      const startMinutes = start.hours * 60 + start.minutes
      const endMinutes = end.hours * 60 + end.minutes
      const totalMinutes = endMinutes - startMinutes
      this.totalIntervals = Math.floor(totalMinutes / this.intervalMinutes)
    },
    parseTime(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number)
      return { hours, minutes }
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
    },
    generateCalendarDays() {
      const days = []
      const totalDays = this.daysInMonth
      const firstDay = (this.firstDayOfMonth + 6) % 7 // Adjusting to make Monday the first day of the week
      for (let i = 0; i < firstDay; i++) {
        days.push({ day: '', hide: true })
      }
      for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, hide: false })
      }
      while (days.length % 7 !== 0) {
        days.push({ day: '', hide: true })
      }
      return days
    }
  }
}
</script>

<template>
  <div class="date-picker">
    <div class="date-picker__header">
      <div class="date-picker__navigation">
        <font-awesome-icon
          :icon="['fas', 'angle-left']"
          @click="prevMonth"
          class="date-picker__icons date-picker__prev"
        />
        <p class="date-picker__title">{{ monthName }} {{ currentYear }}</p>
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          @click="nextMonth"
          class="date-picker__icons date-picker__next"
        />
      </div>
      <p class="date-picker__selected-day">
        {{
          internalSelectedDay.weekday +
          ' ' +
          internalSelectedDay.day +
          ' ' +
          new Date(internalSelectedDay.year, internalSelectedDay.month).toLocaleString('it-IT', {
            month: 'long'
          }) +
          ' ' +
          internalSelectedDay.year
        }}
      </p>
    </div>

    <div class="date-picker__table">
      <div class="date-picker__table__header">
        <ul>
          <li v-for="day in abbreviatedDays" :key="day">{{ day }}</li>
        </ul>
      </div>
      <div class="date-picker__table__content">
        <div class="date-picker__table__month" :value="`${monthName} ${currentYear}`">
          <div
            class="date-picker__table__rows"
            v-for="(week, index) in Math.ceil(generateCalendarDays().length / 7)"
            :key="index"
          >
            <div
              class="date-picker__table__day"
              v-for="day in generateCalendarDays().slice(index * 7, index * 7 + 7)"
              :key="day.day"
              :value="day.day ? `${day.day}/${currentMonth + 1}/${currentYear}` : ''"
              :class="{
                'hide-day': day.hide,
                'current-day':
                  day.day === internalSelectedDay.day &&
                  currentMonth === internalSelectedDay.month &&
                  currentYear === internalSelectedDay.year,
                'past-day': isPastDay(day.day),
                'clickable-day': !isPastDay(day.day) && day.day
              }"
              @click="handleDayClick(day.day)"
            >
              {{ day.day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/functions.scss';

.date-picker {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: responsive-size(3, 1.2);
  padding-right: responsive-size(3, 1.2);
  padding-top: responsive-size(3, 1.5);
  padding-bottom: responsive-size(3, 1.5);
  box-sizing: border-box;

  &__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &__selected-day {
    font-size: 1.4rem;
    text-transform: capitalize;
  }

  &__navigation {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.8rem;
    max-width: 200px;
    position: relative;
  }

  &__icons {
    position: absolute;
    width: 14px;
    height: 14px;
    color: rgba(98, 108, 118, 0.4);
    transition-duration: 0.4s;

    &:hover {
      cursor: pointer;
      color: rgba(98, 108, 118, 1);
    }
  }

  &__next {
    right: 0;
  }

  &__prev {
    left: 0;
  }

  &__title {
    text-align: center;
    margin-right: 2rem;
    margin-left: 2rem;
    text-transform: capitalize;
  }
  &__table {
    width: 100%;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
    position: relative;
    display: flex;
    flex-direction: column;

    &__header {
      padding: 1.5rem 0rem;
      border-bottom: 1px solid #e3eaf3;

      ul {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        list-style-type: none;
        display: flex;
        justify-content: space-between;

        li {
          font-size: 1.3rem;
          color: #c8c9cc;
        }
      }
    }
    &__content {
      height: 100%;
      padding: 1rem 1rem 0rem 1rem;
    }
    &__month {
      height: 100%;
    }
    &__rows {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: var(--date-cell-height);
      padding-bottom: 1rem;
      row-gap: 0rem;
      column-gap: responsive-size(1, 0.5);
      box-sizing: border-box;
    }

    &__day {
      width: calc(100% / 7);
      background-color: rgba(79, 191, 101, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border: 1px solid rgba(79, 191, 101, 0.08);
      transition-duration: 0.4s;

      &:hover {
        cursor: pointer;
      }

      &.current-day {
        background-color: rgba(79, 191, 101, 1);
        border: 1px solid rgba(79, 191, 101, 1);
        color: white;
        font-weight: bold;
      }

      &.past-day {
        background-color: rgba(98, 108, 118, 0.1);
        color: rgba(98, 108, 118, 0.6);

        &:hover {
          cursor: not-allowed;
        }
      }

      &.clickable-day {
        &:hover {
          background-color: rgba(79, 191, 101, 1);
          color: white;
        }
      }
    }

    .hide-day {
      opacity: 0;

      &:hover {
        cursor: default;
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  .date-picker {
    &__navigation {
      max-width: unset;
    }

    &__selected-day {
      display: none;
    }
  }
}
</style>
