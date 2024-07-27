<script>
export default {
  props: {
    selectedDay: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      required: true
    },
    startHour: {
      type: Number,
      required: true
    },
    endHour: {
      type: Number,
      required: true
    },
    minBookingTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentDate: new Date(this.selectedDay.year, this.selectedDay.month, this.selectedDay.day),
      currentTime: null,
      fakeTime: '18:35', // Default null - Altrimenti impostare orario fittizio, esempio '15:30'
      useFakeTime: true, // Default false - Altrimenti per avere orario fittizio impostare a true
      cellHeight: 50 // Valore predefinito di cellHeight, può essere cambiato
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 60000)
    this.calculateCellHeight() // Calcola l'altezza della cella durante il montaggio del componente
    window.addEventListener('resize', this.calculateCellHeight) // Ricalcola l'altezza delle celle al ridimensionamento della finestra
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateCellHeight) // Rimuovi l'evento al momento della distruzione del componente
  },
  computed: {
    hours() {
      const hours = []
      for (let hour = this.startHour; hour < this.endHour; hour++) {
        hours.push(hour)
      }
      return hours
    },
    formattedEvents() {
      return this.getValidEvents().map((event) => {
        const [startHour, startMinute] = event.start.split(':').map(Number)
        const [endHour, endMinute] = event.end.split(':').map(Number)

        const duration = this.calculateDuration(startHour, startMinute, endHour, endMinute)
        const durationHours = duration / 60
        const durationHeight = (duration / 60) * this.cellHeight
        const roundedDurationHours = Math.floor(durationHours)

        const startTop =
          (startHour - this.startHour) * this.cellHeight + (startMinute / 60) * this.cellHeight

        console.log('startHour', startHour)
        console.log('endHour', endHour)
        console.log('startMinute', startMinute)
        console.log('endMinute', endMinute)
        console.log('duration', duration)
        console.log('durationHours', durationHours)
        console.log('durationHeight', durationHeight)
        console.log('roundedDurationHours', roundedDurationHours)
        console.log('')

        return {
          ...event,
          top: startTop,
          height: durationHeight
        }
      })
    }
  },
  methods: {
    updateTime() {
      if (this.useFakeTime && this.fakeTime) {
        const [hours, minutes] = this.fakeTime.split(':').map(Number)
        this.currentTime = { hours, minutes }
      } else {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        this.currentTime = { hours, minutes }
      }
      this.updateIndicatorPosition()
    },
    calculatePosition() {
      const totalHours = this.endHour - this.startHour
      if (!this.currentTime) return 0

      const { hours, minutes } = this.currentTime
      if (hours < this.startHour || (hours >= this.endHour && minutes > 0)) {
        return 0
      }

      const cellHeight = this.cellHeight

      const elapsedHours = hours - this.startHour + minutes / 60
      const percentage = elapsedHours / totalHours
      const totalHeight = totalHours * cellHeight
      const topPosition = percentage * totalHeight

      return topPosition
    },
    updateIndicatorPosition() {
      this.$forceUpdate()
    },
    calculateCellHeight() {
      this.$nextTick(() => {
        const cellElement = this.$el.querySelector('.day-picker-table__cell')
        if (cellElement) {
          this.cellHeight = cellElement.getBoundingClientRect().height
          this.updateIndicatorPosition()
        }
      })
    },
    prevDay() {
      const prevDate = new Date(this.currentDate)
      prevDate.setDate(this.currentDate.getDate() - 1)
      this.currentDate = prevDate
      this.updateIndicatorPosition()
    },
    nextDay() {
      const nextDate = new Date(this.currentDate)
      nextDate.setDate(this.currentDate.getDate() + 1)
      this.currentDate = nextDate
      this.updateIndicatorPosition()
    },
    formatDate(date) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('it-IT', options)
    },
    formatDateForComparison(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return year + '-' + month + '-' + day
    },
    validateEvent(event) {
      const [startHour, startMinute] = event.start.split(':').map(Number)
      const [endHour, endMinute] = event.end.split(':').map(Number)

      const isStartValid =
        startHour > this.startHour || (startHour === this.startHour && startMinute >= 0)
      const isEndValid = endHour < this.endHour || (endHour === this.endHour && endMinute === 0)

      return isStartValid && isEndValid
    },
    getValidEvents() {
      return this.events.filter(
        (event) =>
          this.validateEvent(event) && event.date === this.formatDateForComparison(this.currentDate)
      )
    },
    calculateDuration(startHour, startMinute, endHour, endMinute) {
      const startTotalMinutes = startHour * 60 + startMinute
      const endTotalMinutes = endHour * 60 + endMinute
      const durationInMinutes = endTotalMinutes - startTotalMinutes
      return durationInMinutes
    }
  }
}
</script>

<template>
  <div class="day-picker-table">
    <div class="day-picker-table__header">
      <div class="day-picker-table__header-subcontainer">
        <font-awesome-icon
          :icon="['fas', 'angle-left']"
          class="day-picker-table__icons day-picker-table__prev"
          @click="prevDay"
        />
        <p class="day-picker-table__title">{{ formatDate(currentDate) }}</p>
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          class="day-picker-table__icons day-picker-table__next"
          @click="nextDay"
        />
      </div>
    </div>
    <div class="day-picker-table__body">
      <div class="day-picker-table__fields">
        <div class="day-picker-table__field">Campo 1</div>
        <div class="day-picker-table__field">Campo 2</div>
        <div class="day-picker-table__field">Campo 3</div>
        <div class="day-picker-table__field">Campo 4</div>
        <div class="day-picker-table__field">Campo 5</div>
        <div class="day-picker-table__field">Campo 6</div>
      </div>
      <div class="day-picker-table__content">
        <div class="day-picker-table__hours">
          <div v-for="hour in hours" :key="hour" class="day-picker-table__hour">{{ hour }}:00</div>
        </div>
        <div class="day-picker-table__cells">
          <div
            class="day-picker-table__indicator"
            :style="{ top: calculatePosition() + 'px' }"
          ></div>
          <div v-for="field in [1, 2, 3, 4, 5, 6]" :key="field" class="day-picker-table__col">
            <div
              v-for="hour in hours"
              :key="hour + '-' + field"
              class="day-picker-table__cell"
              :time="hour + ':00'"
              :field="field"
            ></div>
            <div
              v-for="event in formattedEvents.filter((e) => e.field === field)"
              :key="event.start + '-' + event.end"
              class="day-picker-table__event"
              :style="{ top: event.top + 'px', height: event.height + 'px' }"
            >
              <p class="day-picker-table__event__name">{{ event.nome }}</p>
              <p class="day-picker-table__event__time">{{ event.start }} - {{ event.end }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-picker-table {
  width: 100%;

  &__header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
    text-transform: capitalize;
  }

  &__header-subcontainer {
    max-width: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__icons {
    width: 14px;
    height: 14px;
    color: rgba(98, 108, 118, 0.4);
    transition-duration: 0.4s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

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

  &__body {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #00000014;
    background-color: var(--primary-color);
  }

  &__fields {
    height: 24px;
    display: flex;
    border-top: 1px solid #00000014;
    border-left: 1px solid #00000014;
    padding-left: var(--day-time-column-width) !important;
    font-size: 1.2rem;
  }

  &__field {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #00000014;
  }

  &__content {
    display: flex;
    position: relative;
  }

  &__hours {
    border-top: 1px solid #00000014;
    border-left: 1px solid #00000014;
    min-width: var(--day-time-column-width);
  }
  &__hour {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--day-time-cell-height);
    border-bottom: 1px solid #00000014;
    color: #c8c9cc;
  }

  &__cells {
    width: 100%;
    display: flex;
    border-top: 1px solid #00000014;
  }

  &__col {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__cell {
    height: var(--day-time-cell-height);
    display: flex;
    flex-grow: 1;
    border-left: 1px solid #00000014;
    border-bottom: 1px solid #00000014;
  }

  &__event {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background-color: #6c70dc;
    color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    flex-direction: column;

    &__name {
      font-size: 1.2rem;
    }

    &__time {
      font-size: 1rem;
    }

    &__duration {
      font-size: 1rem;
      margin-top: 5px;
    }
  }

  &__indicator {
    position: absolute;
    width: calc(100% - var(--day-time-column-width));
    background-color: red;
    height: 1px;
    left: calc(var(--day-time-column-width) + 1px);

    &::before {
      content: '';
      position: absolute;
      top: -4.5px;
      left: 0;
      border: 5px solid transparent;
      border-left-color: red;
    }
  }
}
</style>
